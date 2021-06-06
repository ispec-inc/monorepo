resource "aws_iam_role" "iam_role" {
  name = "${var.type}-${var.name}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "${var.type}.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_instance_profile" "instance_role" {
  name = aws_iam_role.iam_role.name
  role = aws_iam_role.iam_role.name
}

resource "aws_iam_role_policy" "role_policy" {
  name   = aws_iam_role.iam_role.name
  role   = aws_iam_role.iam_role.id
  policy = var.policy_json
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment" {
  count = var.policy_arn == "" ? 0 : 1

  role       = aws_iam_role.iam_role.name
  policy_arn = var.policy_arn
}
