# Fetch our file from the local file system
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "./aws_code/dist/funny-demo.js"
  output_path = "./aws_code/dist/funny-demo.zip"
}

# Fetch our file from the local file system
data "archive_file" "s3-lambda" {
  type        = "zip"
  source_file = "./aws_code/dist/s3-upload.js"
  output_path = "./aws_code/dist/s3-upload.zip"
}

# Create our lambda function
resource "aws_lambda_function" "terraform-demo" {
  filename      = "./aws_code/dist/funny-demo.zip"
  function_name = "terraform-demo"
  role          = aws_iam_role.lambda_role.arn
  handler       = "funny-demo.handler"
  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime = "nodejs18.x"
}

resource "aws_lambda_function" "s3-demo" {
  filename      = "./aws_code/dist/s3-upload.zip"
  function_name = "s3-demo"
  role          = aws_iam_role.lambda_role.arn
  handler       = "s3-upload.handler"
  source_code_hash = data.archive_file.s3-lambda.output_base64sha256
  runtime = "nodejs18.x"
}

# Create permission to allow lambda to attach API gateway
resource "aws_lambda_permission" "apigw_permission" {
  for_each = toset([aws_lambda_function.terraform-demo.function_name, aws_lambda_function.s3-demo.function_name])
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = each.key
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.terraform-demo-api.execution_arn}/*/*"
}