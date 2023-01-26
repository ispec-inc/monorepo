CREATE TABLE `users` (
  `id` varchar(255) NOT NULL PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

   UNIQUE KEY user_email_unique(email)
);

CREATE TABLE `articles` (
  `id` varchar(255) NOT NULL PRIMARY KEY,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT `articles_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);
