import { useState, useEffect } from "react";
import { database } from "../data/baseDeDatos";

const useDatabase = () => {
  const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);
  const [dbName, setDbName] = useState("database.db");
  const [db, setDb] = useState(null);
  const [users, setUsers] = useState("");
  const [zones, setZones] = useState("");
  const [supply, setSupply] = useState("");
  const [observation, setObservation] = useState("");
  const [trat, setTrat] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        // llamar a una funcion que me haga la conexion a la db
        const openDb = await database.openDatabase(dbName);
        setDb(openDb)

      } catch (err) {
        console.log("error on useDatabase Hook loadData open data base", err);
      }
    };

    loadData().then(() => console.log("Abriendo base de datos"));
  }, [dbName]);

  useEffect(() => {
    const loadData2 = async () => {
      try {

          //Crear las trablas en la base de datos
          await database.setupTableUser(db);
          await database.setupTableZone(db);     
          await database.setupTableSupply(db); 
          await database.setupTableObsevacion(db);
          await database.setupTableTratamientos(db);

          //Obtener datos de la base de datos, si es que los hay
          const usuarios = await database.getUsers();
          const zonas = await database.getZones();
          const insumos = await database.getSupply();
          const observaciones = await database.getObservacion();
          const tratamientos = await database.getTratamientos();

          setUsers(usuarios);
          setZones(zonas);
          setSupply(insumos);
          setObservation(observaciones);
          setTrat(tratamientos);

          //Si no hay datos se borran las tablas, se crean de nuevo y se agrega un dato automatico//
        if (users.length == 0) {
          await database.dropTableUsers(db);
          await database.setupTableUser(db);       
          await database.setupUser(db); 
        }

        if (zones.length == 0) {
          await database.dropTableZones(db);
          await database.setupTableZone(db);
          await database.setupZones(db)
        }

        if(supply.length == 0){
          await database.dropTableSupply(db);
          await database.setupTableSupply(db);
          await database.setupSupply(db)
        }

        if(observation.length == 0){
          await database.dropTableObservacion(db);
          await database.setupTableObsevacion(db);
          await database.setupObservation(db);
        }

        if(trat.length == 0){
          await database.dropTableTratamientos(db);
          await database.setupTableTratamientos(db);
        }

        setIsDBLoadingComplete(true);
      } catch (error) {
        console.log("Erro on useDatabase Hook loadData2: ", error);
      }
    };
    loadData2().then(() => console.log("Cargando datos"));
  }, [db])
  return { isDBLoadingComplete, db, setDbName };
};

export default useDatabase;
