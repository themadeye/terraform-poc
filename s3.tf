resource "aws_s3_bucket" "sampleStore" {
  bucket = "leon-sample-store"
  tags = {
    Description = "Sample storage for learning"
  }
}

resource "aws_s3_bucket_policy" "admin-policy" {
  bucket = aws_s3_bucket.sampleStore.id
  policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "*",
        "Effect": "Allow",
        "Resource": "arn:aws:s3:::${aws_s3_bucket.sampleStore.id}",
        "Principal": {
          "AWS": [
            "${data.aws_iam_user.admin.arn}"
          ]
        }
      }
    ]
  }
  EOF
}

resource "aws_s3_bucket_cors_configuration" "default-cors" {
  bucket = aws_s3_bucket.sampleStore.id
  cors_rule {
    allowed_methods = ["PUT", "GET", "POST", "DELETE"]
    allowed_origins = ["*"]
    allowed_headers = ["*"]
  }
}