create table if not exists invitations (
  id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id bigint NOT NULL,
  code varchar(255) not null,
  created_at datetime not null,
  updated_at datetime not null
);