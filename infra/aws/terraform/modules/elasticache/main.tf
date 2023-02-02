locals {
  name = "${var.name_prefix}${var.env}-${var.app}-${var.role}"
}

resource "aws_elasticache_cluster" "cache" {
  cluster_id           = local.name
  engine               = var.engine
  node_type            = var.node_type
  num_cache_nodes      = var.num_cache_nodes
  parameter_group_name = var.parameter_group_name
  engine_version       = var.engine_version
  port                 = var.port
  security_group_ids   = data.aws_security_groups.cache.ids
  subnet_group_name    = var.subnet_group_name
}

data "aws_security_groups" "cache" {
  filter {
    name   = "tag:Name"
    values = var.security_group_names
  }
}
