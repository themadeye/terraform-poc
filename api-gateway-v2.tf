resource "aws_apigatewayv2_api" "terraform-demo-api" {
  name          = "terraform-demo-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "dev" {
  api_id = aws_apigatewayv2_api.terraform-demo-api.id
  name = "dev"
  auto_deploy = true
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.terraform_demo_api_gw.arn
    format = jsonencode({
      "requestId":"$context.requestId",
      "extendedRequestId":"$context.extendedRequestId",
      "ip": "$context.identity.sourceIp",
      "caller":"$context.identity.caller",
      "user":"$context.identity.user",
      "requestTime":"$context.requestTime",
      "httpMethod":"$context.httpMethod",
      "resourcePath":"$context.resourcePath",
      "status":"$context.status",
      "protocol":"$context.protocol",
      "responseLength":"$context.responseLength"
    })
  }
}

resource "aws_apigatewayv2_integration" "lambda_handler" {
  api_id = aws_apigatewayv2_api.terraform-demo-api.id
  integration_type = "AWS_PROXY"
  integration_uri = aws_lambda_function.terraform-demo.invoke_arn
}

resource "aws_apigatewayv2_integration" "s3-upload-handler" {
  api_id = aws_apigatewayv2_api.terraform-demo-api.id
  integration_type = "AWS_PROXY"
  integration_uri = aws_lambda_function.s3-demo.invoke_arn
}

resource "aws_apigatewayv2_route" "get_handler" {
  api_id = aws_apigatewayv2_api.terraform-demo-api.id
  route_key = "GET /demo"
  target = "integrations/${aws_apigatewayv2_integration.lambda_handler.id}"
}

resource "aws_apigatewayv2_route" "s3-post_handler" {
  api_id = aws_apigatewayv2_api.terraform-demo-api.id
  route_key = "POST /upload"
  target = "integrations/${aws_apigatewayv2_integration.s3-upload-handler.id}"
}

resource "aws_cloudwatch_log_group" "terraform_demo_api_gw" {
  name = "/aws/api-gw/${aws_apigatewayv2_api.terraform-demo-api.name}"
  retention_in_days = 30
}