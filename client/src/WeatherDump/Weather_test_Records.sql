-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: Weather_test
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Records`
--

DROP TABLE IF EXISTS `Records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Records` (
  `Date` date NOT NULL,
  `Humidity` int(2) NOT NULL,
  `WindMPH` int(7) NOT NULL,
  `Temperature` int(3) NOT NULL,
  `precipitation` float DEFAULT NULL,
  `MinTemp` int(3) NOT NULL,
  `MaxTemp` int(3) NOT NULL,
  `Prediction` varchar(30) NOT NULL,
  PRIMARY KEY (`Date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Records`
--

LOCK TABLES `Records` WRITE;
/*!40000 ALTER TABLE `Records` DISABLE KEYS */;
INSERT INTO `Records` VALUES ('2003-04-26',68,8,54,0,41,69,'cool/windy'),('2003-11-03',93,9,46,3.71,44,48,'cool'),('2004-02-10',32,6,32,2.28,26,39,'cold/windy'),('2004-06-28',100,4,74,3.76,63,84,'warm and humid'),('2004-09-20',67,5,65,2.96,48,82,'cool windy'),('2005-08-10',74,6,84,2.98,71,97,'warm and windy'),('2005-09-10',75,3,78,2.96,64,91,'warm and windy'),('2005-10-10',89,1,53,2.76,42,66,'cool and humid'),('2005-11-10',52,6,48,3.71,36,55,'cold/windy'),('2005-12-07',63,9,18,2.86,12,24,'cool'),('2006-02-10',63,5,36,0,27,45,'cold/windy'),('2006-07-02',56,4,80,0,66,97,'warm/dry'),('2006-10-17',89,5,60,0.03,55,64,'very humid/windy'),('2007-03-24',80,3,68,0,55,80,'cool/dry'),('2007-06-14',59,1,76,0,61,91,'warm/no wind'),('2007-11-10',42,3,42,3.71,28,55,'cold/windy'),('2008-03-01',57,6,44,0,27,61,'cold/windy'),('2008-03-23',77,8,36,3.6,30,41,'cold'),('2008-07-17',67,2,78,0,64,93,'warm/humid'),('2009-04-09',80,5,44,1.01,32,44,'cold/humid/rain'),('2009-08-17',86,8,79,1.16,69,79,'warm/humid/rain'),('2009-12-25',76,14,36,0.13,21,50,'cold/windy/precipitation'),('2011-05-17',96,5,50,4.11,37,64,'cool/windy'),('2011-06-26',87,9,75,3.76,66,84,'warm/some rain possible'),('2011-09-11',100,0,70,2.96,57,82,'warm/ dry'),('2014-01-30',40,9,33,2.14,21,45,'cold'),('2015-01-14',74,2,22,2.14,15,28,'cold'),('2015-07-13',65,4,87,2.98,77,97,'hot/dry'),('2016-01-03',93,9,35,3.76,33,37,'cold'),('2016-04-19',60,13,38,3.69,35,43,'cool/windy'),('2017-05-13',69,1,66,4.11,50,82,'warm'),('2017-10-06',56,4,76,2.76,69,84,'cool');
/*!40000 ALTER TABLE `Records` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-26 20:15:43
