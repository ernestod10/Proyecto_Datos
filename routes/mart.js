const express = require('express');
const router = express.Router();
// Get 
module.exports = (pool) => {
  router.get('/', (req, res) => {
  pool.query('SELECT * FROM sucursal', (err, sucursalResult) => {
  if (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
  } else {
  const sucursal = {
  id_sucursal: sucursalResult.rows[0].id_sucursal,
  nombre: sucursalResult.rows[0].nombre,
  ubicacion: sucursalResult.rows[0].ubicacion,
  longitud: sucursalResult.rows[0].longitud,
  latitud: sucursalResult.rows[0].latitud,
  fecha_carga: sucursalResult.rows[0].fecha_carga,
  };
  pool.query('SELECT * FROM modelo_vehiculo', (err, modeloResult) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const modeloVehiculos = modeloResult.rows.map((row) => ({
        id_modelo: row.id_modelo,
        marca: row.marca,
        anio_fabricacion: row.anio_fabricacion,
        nombre_modelo: row.nombre_modelo,
        fecha_carga: row.fecha_carga,
      }));

      pool.query('SELECT * FROM metodo_pago', (err, metodoResult) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          const metodoPagos = metodoResult.rows.map((row) => ({
            id_metodo: row.id_metodo_pago,
            nombre: row.nombre,
            fecha_carga: row.fecha_carga,
          }));

          pool.query('SELECT * FROM tabla_hechos_alquiler', (err, estadisticasResult) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              const estadisticasSucursal = estadisticasResult.rows.map((row) => ({
                tiempo: {
                  id_anio: row.id_anio,
                  id_mes: row.id_mes,
                  id_dia: row.id_dia,
                  id_hora: row.id_hora,
                },
                porc_Satisfaccion_Cliente: row.porcentaje_satisfaccion_cliente,
                id_metodo_pago: row.id_metodo_pago,
                posicion_top_metodo_pago_utilizado: row.top_metodo_pago_utilizado,
                metodo_pago_veces_utilizado: row.metodo_pago_veces_utilizado,
                porcentaje_utilizacion_metodo_pago: row.porcentaje_utilizacion_metodo_pago,
                id_modelo_vehiculo: row.id_modelo_vehiculo,
                posicion_top_modelo_vehiculo_alquilado: row.top_modelo_vehiculo_alquilado,
                modelo_veces_alquilado: row.veces_alquilado,
                modelo_porcentaje_alquilado: row.porcenjate_alquilado_modelo,
                ingresos: row.ingresos,
                egresos: row.egresos,
                porc_ingresos: row.porcentaje_ingresos,
                porc_egresos: row.porcentaje_egresos,
                ganancia_neta: row.ganancia,
                porc_vehiculos_disponibles: row.porcentaje_vehiculos_disponibles,
                duracion_promedio_alquiler: row.duracion_alquiler,
                total_alquileres: row.total_alquileres,
                porc_vehiculos_utilizados: row.porcentaje_vehiculos_alquilados,
              }));

        const jsonData = {
          sucursal: sucursal,
          modelo_Vehiculos: modeloVehiculos,
          metodo_Pagos: metodoPagos,
          estadisticas_sucursal: estadisticasSucursal
        };

              res.json(jsonData);
            }
          });
        }
      });
    }
  });
}
});
  });
return router;
};