output "reader_endpoint" {
  value = aws_rds_cluster.rds_cluster.reader_endpoint
}

output "endpoint" {
  value = aws_rds_cluster.rds_cluster.endpoint
}
