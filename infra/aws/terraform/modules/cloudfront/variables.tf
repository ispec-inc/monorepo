variable "env" {
  type = string
}

variable "role" {
  type = string
}

variable "s3_regional_domain_name" {
  type = string
}

variable "s3_id" {
  type = string
}

variable "cert_arn" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "is_ipv6_enabled" {
  type    = bool
  default = false
}

variable "default_root_object" {
  type    = string
  default = "index.html"
}

variable "cached_methods" {
  type    = list(string)
  default = ["GET", "HEAD"]
}

variable "default_cache_min_ttl" {
  type    = number
  default = 0
}

variable "default_cache_default_ttl" {
  type    = number
  default = 3600
}

variable "default_cache_max_ttl" {
  type    = number
  default = 86400
}

variable "lambda_edges" {
  type = list(object({
    event_type    = string
    qualified_arn = string
  }))
  default = []
}
