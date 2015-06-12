-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:8889
-- Tiempo de generación: 15-12-2014 a las 22:13:56
-- Versión del servidor: 5.5.38
-- Versión de PHP: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `veranoitau`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos`
--

CREATE TABLE `codigos` (
`codigos_id` smallint(5) unsigned NOT NULL,
  `codigos_titulo` varchar(255) NOT NULL,
  `codigos_slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medias`
--

CREATE TABLE `medias` (
`medias_id` smallint(5) unsigned NOT NULL,
  `medias_file` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
`novedades_id` smallint(5) unsigned NOT NULL,
  `novedades_desc` text NOT NULL,
  `novedades_en_home` tinyint(1) NOT NULL,
  `novedades_desc_corta` text NOT NULL,
  `novedades_titulo` varchar(255) NOT NULL,
  `novedades_json_galeria` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`novedades_id`, `novedades_desc`, `novedades_en_home`, `novedades_desc_corta`, `novedades_titulo`, `novedades_json_galeria`) VALUES
(28, 'la hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hdla hsdlkjsa hd', 1, '', '', ''),
(29, 'asasdxxxxxxasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sdasd asda sd', 1, '', '', ''),
(30, 'fdgfdg', 1, '', '', ''),
(31, 'fdcvbvcbvcbretre tre ter te tr ', 0, '', '', ''),
(32, 'asd', 1, '', '', ''),
(33, '', 0, '', '', ''),
(34, '', 0, '', '', ''),
(35, '', 0, '', '', ''),
(36, 'desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  desc larga  ', 0, 'desc crota desc crota desc crota desc crota desc crota desc crota desc crota desc crota desc crota desc crota desc crota desc crota desc crota desc crota desc crota ', '', ''),
(37, '111Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción', 0, '111desc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc cortadesc corta1', 'titulo 1111', ''),
(38, '123', 0, '123', '213', ''),
(39, '123', 0, '123', '213', ''),
(40, '123', 0, '123', '213', ''),
(41, '123', 0, '123', '213', ''),
(42, '123', 0, '123', '213', ''),
(43, 'asd', 0, 'asd', 'asd', ''),
(44, 'asd', 0, 'asd', 'asd', ''),
(45, '222asd2222', 0, '222asd2222', '222asd122222', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `codigos`
--
ALTER TABLE `codigos`
 ADD PRIMARY KEY (`codigos_id`);

--
-- Indices de la tabla `medias`
--
ALTER TABLE `medias`
 ADD PRIMARY KEY (`medias_id`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
 ADD PRIMARY KEY (`novedades_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `codigos`
--
ALTER TABLE `codigos`
MODIFY `codigos_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `medias`
--
ALTER TABLE `medias`
MODIFY `medias_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
MODIFY `novedades_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=46;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
