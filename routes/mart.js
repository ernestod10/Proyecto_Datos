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
  pool.query('SELECT * FROM modelo_vehiculos', (err, modeloResult) => {
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

      pool.query('SELECT * FROM metodo_pagos', (err, metodoResult) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          const metodoPagos = metodoResult.rows.map((row) => ({
            id_metodo: row.id_metodo,
            nombre: row.nombre,
            fecha_carga: row.fecha_carga,
          }));

          pool.query('SELECT * FROM estadisticas_sucursal', (err, estadisticasResult) => {
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
                porc_Satisfaccion_Cliente: row.porc_Satisfaccion_Cliente,
                id_metodo_pago: row.id_metodo_pago,
                posicion_top_metodo_pago_utilizado: row.posicion_top_metodo_pago_utilizado,
                metodo_pago_veces_utilizado: row.metodo_pago_veces_utilizado,
                porcentaje_utilizacion_metodo_pago: row.porcentaje_utilizacion_metodo_pago,
                id_modelo_vehiculo: row.id_modelo_vehiculo,
                posicion_top_modelo_vehiculo_alquilado: row.posicion_top_modelo_vehiculo_alquilado,
                modelo_veces_alquilado: row.modelo_veces_alquilado,
                modelo_porcentaje_alquilado: row.modelo_porcentaje_alquilado,
                ingresos: row.ingresos,
                egresos: row.egresos,
                porc_ingresos: row.porc_ingresos,
                porc_egresos: row.porc_egresos,
                ganancia_neta: row.ganancia_neta,
                porc_vehiculos_disponibles: row.porc_vehiculos_disponibles,
                duracion_promedio_alquiler: row.duracion_promedio_alquiler,
                total_alquileres: row.total_alquileres,
                porc_vehiculos_utilizados: row.porc_vehiculos_utilizados,
              }));

              const jsonData = {
                sucursal,
                modelo_Vehiculos: modeloVehiculos,
                metodo_Pagos: metodoPagos,
                estadisticas_sucursal: estadisticasSucursal,
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