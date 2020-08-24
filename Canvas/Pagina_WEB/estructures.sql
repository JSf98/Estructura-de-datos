-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-08-2020 a las 12:13:31
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `estructures`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nom` char(20) DEFAULT NULL,
  `descripcio` char(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nom`, `descripcio`) VALUES
(1, 'Estructura lineal', 'Tenen en comú que l\'ordre de consulta y eliminació\r\nde la informació depenen exclusivament del seu ordre d\'inserció (LIFO o FIFO).\r\nLes podem imaginar com una cadena lineal on el que varia es l\'extrem'),
(2, 'Arbre', 'Conjunt finit de un o més nodes on hi ha un denominador arrel dins l\'arbre, i el\r\nreste d\'elements està dividit en n>=0 conjunts disjunts T1...Tn on cada conjunt és un arbre.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estructura`
--

CREATE TABLE `estructura` (
  `id` int(11) NOT NULL,
  `nom` char(20) DEFAULT NULL,
  `url_img` char(100) DEFAULT NULL,
  `url_estructura` char(100) DEFAULT NULL,
  `categoria` int(11) DEFAULT NULL,
  `descripcio` char(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estructura`
--

INSERT INTO `estructura` (`id`, `nom`, `url_img`, `url_estructura`, `categoria`, `descripcio`) VALUES
(1, 'Pila LIFO', 'img/pila.png', '../PilaEnllaçada/PilaEnllaçada.php', 1, 'El elements s\'obtenen en l\'ordre d\'insersió.\r\nTenim un marcador TOP que sempre marca la cima. S\'han de tenir en comtpe errors dels tipus\r\ndesempilar quan no hi ha elements, quan es vol mirar la cima i  la pila està buida. \r\n'),
(4, 'Llista Cursor', 'img/llista_cursor.png', '../Llista_Cursor/EnllaçadaCursor.php', 1, 'Estructura implementada amb un array.\r\nCada posició conté un cursor al següent element. Permet gestionar varies llistes dins un sol array'),
(5, 'Arbre binari', NULL, '../Arbre/arbre.php', 2, 'Arbre binari no balancejat');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opcio`
--

CREATE TABLE `opcio` (
  `id` int(11) NOT NULL,
  `titol` char(30) DEFAULT NULL,
  `url` char(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `opcio`
--

INSERT INTO `opcio` (`id`, `titol`, `url`) VALUES
(1, 'Inserir nova estructura', 'estructura.php'),
(2, 'Nou usuari', 'nouUser.php'),
(3, 'Nova categoria', 'categoria.php');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegi`
--

CREATE TABLE `privilegi` (
  `perfil` int(11) NOT NULL,
  `opcio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `privilegi`
--

INSERT INTO `privilegi` (`perfil`, `opcio`) VALUES
(1, 1),
(1, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipusperfil`
--

CREATE TABLE `tipusperfil` (
  `id` int(11) NOT NULL,
  `tipus` char(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipusperfil`
--

INSERT INTO `tipusperfil` (`id`, `tipus`) VALUES
(1, 'admin'),
(2, 'noadmin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuari`
--

CREATE TABLE `usuari` (
  `id` int(11) NOT NULL,
  `user` char(20) DEFAULT NULL,
  `password` char(255) DEFAULT NULL,
  `tipus` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuari`
--

INSERT INTO `usuari` (`id`, `user`, `password`, `tipus`) VALUES
(12, 'admin', '$2y$10$QLzZqAMzd3RpU88aN1pMIOJKWBCa9tBS7k6iJSeMyCirin7Ofm0d.', 1),
(13, 'alumne', '$2y$10$x1Yn6z0T3dhd0wJ7ng.FF.DDep7PPkxgNkXSE.DqI9/A0vndZPk9q', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estructura`
--
ALTER TABLE `estructura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria` (`categoria`);

--
-- Indices de la tabla `opcio`
--
ALTER TABLE `opcio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `privilegi`
--
ALTER TABLE `privilegi`
  ADD PRIMARY KEY (`perfil`,`opcio`),
  ADD KEY `opcio` (`opcio`);

--
-- Indices de la tabla `tipusperfil`
--
ALTER TABLE `tipusperfil`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuari`
--
ALTER TABLE `usuari`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipus` (`tipus`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `estructura`
--
ALTER TABLE `estructura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `opcio`
--
ALTER TABLE `opcio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipusperfil`
--
ALTER TABLE `tipusperfil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuari`
--
ALTER TABLE `usuari`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estructura`
--
ALTER TABLE `estructura`
  ADD CONSTRAINT `estructura_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id`);

--
-- Filtros para la tabla `privilegi`
--
ALTER TABLE `privilegi`
  ADD CONSTRAINT `privilegi_ibfk_1` FOREIGN KEY (`perfil`) REFERENCES `tipusperfil` (`id`),
  ADD CONSTRAINT `privilegi_ibfk_2` FOREIGN KEY (`opcio`) REFERENCES `opcio` (`id`);

--
-- Filtros para la tabla `usuari`
--
ALTER TABLE `usuari`
  ADD CONSTRAINT `usuari_ibfk_1` FOREIGN KEY (`tipus`) REFERENCES `tipusperfil` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
