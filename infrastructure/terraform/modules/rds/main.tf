locals {
  name = "${var.name_prefix}${var.env}-${var.app}-${var.role}"
}

data "aws_subnet_ids" "main" {
  vpc_id = var.vpc_id

  filter {
    name   = "tag:Name"
    values = var.subnet_names
  }
}

resource "aws_db_subnet_group" "db_subnet_group" {
  name       = local.name
  subnet_ids = data.aws_subnet_ids.main.ids
}

data "aws_security_groups" "main" {
  filter {
    name   = "tag:Name"
    values = var.security_group_names
  }
}

resource "aws_rds_cluster_parameter_group" "rds_cluster_parameter_group" {
  name   = local.name
  family = var.family

  parameter {
    name         = "character_set_server"
    value        = "utf8mb4"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "character_set_client"
    value        = "utf8mb4"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "time_zone"
    value        = "Asia/Tokyo"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "innodb_file_format"
    value        = "Barracuda"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "innodb_file_per_table"
    value        = "1"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "innodb_large_prefix"
    value        = "1"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "server_audit_logging"
    value        = "1"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "server_audit_events"
    value        = "Connect,Query,Query_DCL,Query_DDL,Query_DML,Table"
    apply_method = "pending-reboot"
  }
}

resource "aws_rds_cluster" "rds_cluster" {
  cluster_identifier              = local.name
  availability_zones              = var.availability_zones
  database_name                   = var.database_name
  master_username                 = var.master_username
  master_password                 = var.master_password
  backup_retention_period         = var.backup_retention_period
  preferred_backup_window         = var.preferred_backup_window
  preferred_maintenance_window    = var.preferred_maintenance_window
  db_cluster_parameter_group_name = aws_rds_cluster_parameter_group.rds_cluster_parameter_group.name
  db_subnet_group_name            = aws_db_subnet_group.db_subnet_group.name
  vpc_security_group_ids          = data.aws_security_groups.main.ids
  skip_final_snapshot             = var.skip_final_snapshot
  final_snapshot_identifier       = local.name
  snapshot_identifier             = var.snapshot_identifier
  engine                          = var.engine

  enabled_cloudwatch_logs_exports = [
    "audit",
    "slowquery",
  ]

  tags = {
    Environment = var.env
    Application = var.app
    Role        = var.role
    Name        = local.name
  }

  lifecycle {
    ignore_changes = [
      availability_zones,
    ]
  }
}

resource "aws_db_parameter_group" "db_parameter_group" {
  name   = local.name
  family = var.family

  parameter {
    name         = "slow_query_log"
    value        = var.slow_query_log
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "long_query_time"
    value        = var.long_query_time
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "max_connections"
    value        = var.max_connections
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "innodb_large_prefix"
    value        = "1"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "innodb_file_format"
    value        = "Barracuda"
    apply_method = "pending-reboot"
  }
}

locals {
  iam_role_type = "monitoring.rds"
  iam_role_name = "${local.iam_role_type}-${var.app}-${var.env}"
}

resource "aws_iam_role" "monitoring_role" {
  name = local.iam_role_name

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "${local.iam_role_type}.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_instance_profile" "instance_role" {
  name = local.iam_role_name
  role = aws_iam_role.monitoring_role.name
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment" {
  role       = aws_iam_role.monitoring_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}

resource "aws_cloudwatch_log_group" "cloudwatch_log_group_audit" {
  name              = "/aws/rds/cluster/${local.name}/audit"
  retention_in_days = 90
}

resource "aws_cloudwatch_log_group" "cloudwatch_log_group_slowquery" {
  name              = "/aws/rds/cluster/${local.name}/slowquery"
  retention_in_days = 90
}

resource "aws_rds_cluster_instance" "rds_cluster_instance" {
  cluster_identifier      = aws_rds_cluster.rds_cluster.id
  instance_class          = var.instance_class
  count                   = var.instance_count
  identifier              = "${local.name}-${format("%02d", count.index)}"
  db_subnet_group_name    = aws_db_subnet_group.db_subnet_group.name
  db_parameter_group_name = aws_db_parameter_group.db_parameter_group.name
  engine                  = var.engine
  monitoring_role_arn     = aws_iam_role.monitoring_role.arn
  monitoring_interval     = 15

  tags = {
    Environment = var.env
    Role        = var.role
    Name        = "${local.name}-${format("%02d", count.index)}"
  }
}
