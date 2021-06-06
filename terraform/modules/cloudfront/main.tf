resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "origin access identity for s3"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = var.s3_regional_domain_name
    origin_id   = var.s3_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  aliases = [var.domain_name]

  enabled             = true
  is_ipv6_enabled     = var.is_ipv6_enabled
  comment             = "${var.env}-${var.role}"
  default_root_object = var.default_root_object

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = var.cached_methods
    target_origin_id = var.s3_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = var.default_cache_min_ttl
    default_ttl            = var.default_cache_default_ttl
    max_ttl                = var.default_cache_max_ttl

    dynamic "lambda_function_association" {
      for_each = var.lambda_edges

      content {
        event_type = lambda_function_association.value.event_type
        lambda_arn = lambda_function_association.value.qualified_arn
      }
    }
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/${var.default_root_object}"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/${var.default_root_object}"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.cert_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }
}
