export const verificarRol = (...rolesPermitidos) => {

  return (req, res, next) => {

    try {

      const rolUsuario = req.usuario.rol;

      if (!rolesPermitidos.includes(rolUsuario)) {

        return res.status(403).json({
          mensaje: "No tienes permisos"
        });
      }

      next();

    } catch (error) {

      return res.status(500).json({
        mensaje: "Error del servidor"
      });
    }
  };
};