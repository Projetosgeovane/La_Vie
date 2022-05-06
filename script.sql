-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema la_vie
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema la_vie
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `la_vie` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `la_vie` ;

-- -----------------------------------------------------
-- Table `la_vie`.`paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_vie`.`paciente` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `idade` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 49
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `la_vie`.`psicologos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_vie`.`psicologos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `apresentacao` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `la_vie`.`atendimentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_vie`.`atendimentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_atendimento` DATE NOT NULL,
  `observacao` VARCHAR(45) NOT NULL,
  `paciente_id` INT UNSIGNED NOT NULL,
  `psicologos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_atendimentos_paciente1_idx` (`paciente_id` ASC) VISIBLE,
  INDEX `fk_atendimentos_psicologos1_idx` (`psicologos_id` ASC) VISIBLE,
  CONSTRAINT `fk_atendimentos_paciente1`
    FOREIGN KEY (`paciente_id`)
    REFERENCES `la_vie`.`paciente` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_atendimentos_psicologos1`
    FOREIGN KEY (`psicologos_id`)
    REFERENCES `la_vie`.`psicologos` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 49
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `la_vie`.`paciente_psicologos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_vie`.`paciente_psicologos` (
  `paciente_id` INT UNSIGNED NOT NULL,
  `psicologos_id` INT NOT NULL,
  PRIMARY KEY (`paciente_id`, `psicologos_id`),
  INDEX `fk_paciente_has_psicologos_psicologos1_idx` (`psicologos_id` ASC) VISIBLE,
  INDEX `fk_paciente_has_psicologos_paciente_idx` (`paciente_id` ASC) VISIBLE,
  CONSTRAINT `fk_paciente_has_psicologos_paciente`
    FOREIGN KEY (`paciente_id`)
    REFERENCES `la_vie`.`paciente` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_paciente_has_psicologos_psicologos1`
    FOREIGN KEY (`psicologos_id`)
    REFERENCES `la_vie`.`psicologos` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
