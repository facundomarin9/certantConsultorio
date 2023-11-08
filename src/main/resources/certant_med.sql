CREATE DATABASE  IF NOT EXISTS `certant_med` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `certant_med`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: certant_med
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `especialidad` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `activo` tinyint DEFAULT NULL,
  `fechabaja` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `especialidad` (`especialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (25,'Clinica Medica','Medicina en General',1,NULL),(26,'Dermatologia','Medicina de la piel',1,NULL),(27,'Pediatria','Medicina para niños',1,NULL),(28,'Cardiologia','Medicina del corazon',1,NULL);
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'1','create-table-especialidades','SQL','V1__create-table-especialidades.sql',-570001961,'root','2023-11-04 15:19:07',23,1),(2,'2','alter-table-especialidades-add-activo','SQL','V2__alter-table-especialidades-add-activo.sql',-1246129887,'root','2023-11-04 15:57:14',18,1),(3,'3','alter-table-especialidades-add-fechabaja','SQL','V3__alter-table-especialidades-add-fechabaja.sql',-2090078548,'root','2023-11-04 15:57:14',11,1),(4,'4','create-table-profesionales','SQL','V4__create-table-profesionales.sql',1120417935,'root','2023-11-04 17:19:27',24,1),(5,'5','create-table-especialidadprofesional','SQL','V5__create-table-especialidadprofesional.sql',1509510512,'root','2023-11-04 19:06:32',49,1),(6,'6','create-table-horarios','SQL','V6__create-table-horarios.sql',1312961730,'root','2023-11-05 14:30:17',81,1),(8,'8','create-table-paciente','SQL','V8__create-table-paciente.sql',839471046,'root','2023-11-05 19:55:57',21,1),(9,'9','create-table-turno','SQL','V9__create-table-turno.sql',-348907159,'root','2023-11-05 20:10:53',17,1),(10,'10','create-table-especialidadprofesional','SQL','V10__create-table-especialidadprofesional.sql',1509510512,'root','2023-11-07 17:07:58',30,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `inicioConsulta` datetime NOT NULL,
  `profesional_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES (106,'2023-11-05 08:00:00',52),(107,'2023-11-05 08:30:00',52),(108,'2023-11-05 09:00:00',52),(109,'2023-11-05 09:30:00',52),(110,'2023-11-05 10:00:00',53),(111,'2023-11-05 10:30:00',53),(112,'2023-11-05 11:00:00',54),(113,'2023-11-05 11:30:00',54),(114,'2023-11-05 12:00:00',55),(115,'2023-11-05 12:30:00',55),(116,'2023-11-05 13:00:00',56),(117,'2023-11-05 13:30:00',56),(118,'2023-11-05 14:00:00',57),(119,'2023-11-05 14:30:00',57),(120,'2023-11-05 15:00:00',58),(121,'2023-11-05 15:30:00',59),(122,'2023-11-05 16:00:00',60),(123,'2023-11-05 08:30:00',61),(124,'2023-11-05 09:30:00',61),(125,'2023-11-05 10:30:00',61),(126,'2023-11-05 20:30:00',62),(127,'2023-11-05 22:30:00',63),(128,'2023-11-05 17:30:00',64),(129,'2023-11-05 12:30:00',65),(130,'2023-11-05 13:30:00',65),(131,'2023-11-05 14:30:00',66),(132,'2023-11-05 16:30:00',66),(133,'2023-11-05 18:30:00',67),(134,'2023-11-05 19:30:00',67);
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombrepaciente` varchar(100) NOT NULL,
  `apellidopaciente` varchar(100) NOT NULL,
  `dnipaciente` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (7,'Juan','Cutrera','100'),(8,'Sergio','Marin','200'),(9,'Alejandra','Araujo','300'),(10,'Rosa','Ochoa','900');
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesional`
--

DROP TABLE IF EXISTS `profesional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesional` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `consultorio` varchar(10) NOT NULL,
  `matricula` varchar(100) NOT NULL,
  `activo` tinyint DEFAULT NULL,
  `fechabaja` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesional`
--

LOCK TABLES `profesional` WRITE;
/*!40000 ALTER TABLE `profesional` DISABLE KEYS */;
INSERT INTO `profesional` VALUES (52,'Jorge','Vargas','1','10000',1,NULL),(53,'Franco','Castillo','1','20000',1,NULL),(54,'Geremias','Scarficcia','1','30000',1,NULL),(55,'Alejo','Ocaransa','1','40000',1,NULL),(56,'Rocio','Aragon','2','50000',1,NULL),(57,'Franco','Arancibia','2','60000',1,NULL),(58,'Francisco','Olave','2','70000',1,NULL),(59,'Ezequiel','Balcaldi','2','80000',1,NULL),(60,'Romina','Sanchez','3','90000',1,NULL),(61,'Profesional2','Profesional2','3','100000',1,NULL),(62,'Profesional3','Profesional3','3','110000',1,NULL),(63,'Profesional4','Profesional4','3','120000',1,NULL),(64,'Profesional5','Profesional5','4','130000',1,NULL),(65,'Profesional6','Profesional6','4','140000',1,NULL),(66,'Profesional7','Profesional7','4','150000',1,NULL),(67,'Profesional8','Profesional8','4','160000',1,NULL);
/*!40000 ALTER TABLE `profesional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesional_especialidad`
--

DROP TABLE IF EXISTS `profesional_especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesional_especialidad` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `especialidad_id` bigint NOT NULL,
  `profesional_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesional_especialidad`
--

LOCK TABLES `profesional_especialidad` WRITE;
/*!40000 ALTER TABLE `profesional_especialidad` DISABLE KEYS */;
INSERT INTO `profesional_especialidad` VALUES (2,25,52),(4,25,53),(5,25,54),(6,25,55),(7,26,56),(8,26,57),(9,26,58),(10,26,59),(11,27,60),(12,27,61),(13,27,62),(14,27,63),(15,28,64),(16,28,65),(17,28,66),(18,28,67);
/*!40000 ALTER TABLE `profesional_especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fechaturno` datetime NOT NULL,
  `confirmado` tinyint DEFAULT NULL,
  `paciente_id` bigint NOT NULL,
  `profesional_id` bigint NOT NULL,
  `especialidad_id` bigint NOT NULL,
  `horario_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
INSERT INTO `turno` VALUES (104,'2023-11-09 00:00:00',1,7,52,25,106),(105,'2023-11-10 00:00:00',1,7,53,25,111);
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-08  2:01:56
