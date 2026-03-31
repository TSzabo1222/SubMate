CREATE DATABASE IF NOT EXISTS submate;
USE submate;

-- Felhaszn
CREATE TABLE user (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  id VARCHAR(100) NOT NULL,
  u_name VARCHAR(20) NOT NULL,
  pw VARCHAR(18) NOT NULL,
  email VARCHAR(254) NOT NULL,
  gender VARCHAR(6) NOT NULL,
  isactive VARCHAR(3) NOT NULL,
  u_role VARCHAR(20) NOT NULL  
);


-- Jogosultságok
CREATE TABLE roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  roles VARCHAR(20) NOT NULL
);

INSERT INTO roles (roles) VALUES
('admin'),
('staff');


-- Kat
CREATE TABLE category (
  cat_id INT AUTO_INCREMENT PRIMARY KEY,
  cat_name VARCHAR(20) NOT NULL,
  valid BOOLEAN DEFAULT TRUE
);

-- Szolg / előfiz
CREATE TABLE services (
  serv_id INT AUTO_INCREMENT PRIMARY KEY,
  serv_name VARCHAR(20) NOT NULL,
  cat_id INT,
  serv_start DATE NOT NULL,
  serv_end DATE NOT NULL,
  user_id INT,
  cost INT,
  FOREIGN KEY (cat_id) REFERENCES category(cat_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);


INSERT INTO `user`
(`user_id`, `id`, `u_name`, `pw`, `email`, `gender`, `isactive`, `u_role`)
VALUES
(1, 'testuser', 'Teszt Elek', 'Test123!', 'test@test.hu', 'female', 1, 'admin'),
(2, 'admin',    'Stephen Bunthing',   'Test123!', 'admin@gmail.com', 'male', 1, 'admin'),
(3, 'test1',    'Ryomen Sukuna',   'Test123!', 'ryomensukuna@gmail.com', 'male', 1, 'staff'),
(4, 'test2',    'Szalmon Ella',   'Test123!', 'salmon@gmail.com', 'male', 0, 'staff'),
(5, 'test3',    'Lakatos Aphrodité',   'Test123!', 'laf@gmail.com', 'male', 1, 'staff'),
(6, 'test4',    'Test1',   'Test123!', 'test1@gmail.com', 'male', 1, 'staff'),
(7, 'test5',    'Orbán Ferenc',   'Test123!', 'orbanferenc@gmail.com', 'male', 1, 'staff');


INSERT INTO category (cat_name) VALUES
('Szórakozás'),
('Szoftver'),
('Egészség');

INSERT INTO services (serv_name, cat_id, serv_start, serv_end, user_id, cost)
VALUES
('Netflix', 1, '2024-01-01', '2025-01-01', 1, 3500),
('Spotify', 1, '2024-03-01', '2025-03-01', 1, 4000);




-- időtartamra javitás 
-- egy árat is hozzáadni