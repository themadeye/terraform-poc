provider "aws" {
  region = "us-east-1"
  profile = "leonkong-sandbox"
}

resource "aws_iam_policy" "adminUser" {
  name = "AdminUsers"
  policy = file("./iam_policies/admin-policy.json")
}

resource "aws_iam_policy" "iam_policy_for_lambda" {
  name = "aws_iam_policy_for_terraform_aws_lambda_role"
  path = "/"
  description = "AWS IAM Policy for managing aws lambda role"
  policy = <<EOF
    {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Action": [
           "logs:CreateLogGroup",
           "logs:CreateLogStream",
           "logs:PutLogEvents"
         ],
         "Resource": "arn:aws:logs:*:*:*",
         "Effect": "Allow"
       }
     ]
    }
  EOF
}

resource "aws_iam_user_policy_attachment" "leon-terraform-admin-access" {
  user = aws_iam_user.admin-user.name
  policy_arn = aws_iam_policy.adminUser.arn
}

resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
  role        = aws_iam_role.lambda_role.name
  policy_arn  = aws_iam_policy.iam_policy_for_lambda.arn
}


resource "aws_iam_user" "admin-user" {
  name = "leon-terraform"
  tags = {
    Description = "Dev user for Terraform"
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "TerraformLearningRole-Lambda"
  assume_role_policy = file("./iam_policies/lambda-role-policy.json")
}

resource "aws_iam_access_key" "admin-user" {
  user = aws_iam_user.admin-user.name
}

data "aws_iam_user" "admin" {
  user_name  = "leon-terraform"
}