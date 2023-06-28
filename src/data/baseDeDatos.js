import * as SQlite from "expo-sqlite";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";

let db = SQlite.openDatabase("database.db");

const createTableUsersSQL =
  "CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), apellido VARCHAR(50), cedula NUMERIC(8), avatarUrl VARCHAR(400))";
const insertUserSQL =
  "INSERT INTO users (name, apellido, cedula, avatarUrl) VALUES (?,?,?,?)";
const updateUserSQL =
  "UPDATE users SET name = (?), apellido = (?), cedula = (?), avatarUrl = (?) WHERE id = (?)";
const deletetUserSQL = "DELETE FROM users WHERE id = (?)";

const createTableZonesSQL =
  "CREATE TABLE zones(id INTEGER PRIMARY KEY AUTOINCREMENT, lugar VARCHAR(15), departamento VARCHAR(50), trabajadores NUMERIC(3), latitud NUMERIC(26,23), longitud NUMERIC(26,23))";
const insertZoneSQL =
  "INSERT INTO zones (lugar, departamento, trabajadores, latitud, longitud) VALUES (?,?,?,?,?)";
const updateZoneSQL =
  "UPDATE zones SET lugar = (?), departamento = (?), trabajadores = (?), latitud = (?), longitud = (?) WHERE id = (?)";
const deletetZoneSQL = "DELETE FROM zones WHERE id = (?)";

const createTableSupplySQL =
  "CREATE TABLE supply (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (50), cantidad NUMERIC(4))";
const insertSupplySQL =
  "INSERT INTO supply (name, cantidad) VALUES (?,?)";
const updateSupplySQL =
  "UPDATE supply SET name = (?), cantidad (?) WHERE id = (?)";
const deleteSupplySQL = "DELETE FROM supply WHERE id = (?)";

const createTableObSQL =
  "CREATE TABLE observacion (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR (50), foto VARCHAR(400), latitud NUMERIC(26,23), longitud NUMERIC(26,23))";
const insertObSQL =
  "INSERT INTO observacion (titulo, foto, latitud, longitud) VALUES (?,?,?,?)";
const updateObSQL =
  "UPDATE observacion SET titulo = (?), foto = (?), latitud = (?), longitud = (?)";
const deleteObSQL =
  "DELETE FROM observacion WHERE id = (?)";

const createTableTratamientoSQL =
  "CREATE TABLE tratamientos (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (50), zone INTEGER REFERENCES zones(id), user INTEGER references users (id), fechaIni VARCHAR(100), fechaFin VARCHAR (100), tiempo INT, orden VARCHAR (500), insumos VARCHAR (50), observaciones INTEGER REFERENCES observacion (id))";
const insertTratamientoSQL =
  "INSERT INTO tratamientos (name, zone, user, fechaIni, fechaFin, tiempo, orden, insumos, observaciones) VALUES (?,?,?,?,?,?,?,?,?)";
const updateTratamientoSQL =
  "UPDATE tratamientos SET name = (?), zone = (?), user = (?), fechaIni = (?), fechaFin = (?), tiempo = (?), orden = (?), insumos = (?), observaciones = (?)";
const deleteTratamientoSQL =
  "DELTE FROM tratamientos WHERE id = (?)";

//Coneccion con la base de datos//
const openDatabase = async (dbName) => {
  db = SQlite.openDatabase(dbName);
  return db;
}

const closeConnection = () => {
  db.close();
}

// Creacion de tablas//
const setupTableUser = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createTableUsersSQL,
        [],
        (_, error) => {
          console.log("error on setupDatabase table Users", error);
          reject(error);
        },
        (_, succes) => {
          resolve(succes);
        }
      );
    });
  });
};

const setupTableZone = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createTableZonesSQL,
        [],
        (_, error) => {
          console.log("error on setupDatabase table Zone", error);
          reject(error);
        },
        (_, succes) => {
          resolve(succes);
        }
      );
    });
  });
};

const setupTableSupply = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createTableSupplySQL,
        [],
        (_, error) => {
          console.log("error on setupDatabase table Supply", error);
          reject(error);
        },
        (_, succes) => {
          resolve(succes);
        }
      );
    });
  });
};

const setupTableObsevacion = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createTableObSQL,
        [],
        (_, error) => {
          console.log("error on setupDatabase table Observacion", error);
          reject(error);
        },
        (_, succes) => {
          resolve(succes);
        }
      );
    });
  });
};

const setupTableTratamientos = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createTableTratamientoSQL,
        [],
        (_, error) => {
          console.log("error on setupDatabase table Tratamientos", error);
          reject(error);
        },
        (_, succes) => {
          resolve(succes);
        }
      );
    });
  });
};

//Datos de base//

const setupZones = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO zones (lugar, departamento, trabajadores, latitud, longitud) VALUES (?, ?, ?, ?, ?)",
        ["Estancia", "Colonia", 5, 45.8, 230.50],
        (tx, succes) => {
          resolve(succes);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

const setupSupply = async () => {
  return new Promise((resolve, reject) => {

    db.transaction((tx) => {

      tx.executeSql(
        "INSERT INTO supply (name, cantidad) VALUES (?, ?)",
        ["Trigo", 400],
        (tx, succes) => {
          resolve(succes);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};


//Eliminacion de tablas//
const dropTableUsers = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
        [],
        (tx, res) => {
          if (res.rows.length) {
            txn.executeSql("DROP TABLE IF EXISTS users", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), apellido VARCHAR(40), cedula NUMERIC(8), avatarUrl VARCHAR(200))",
              [],
              (_, succes) => {
                resolve(succes);
              },
              (_, error) => {
                console.log("error dropping users table", error);
                reject(error);
              }
            );
          }
        }
      );
    });
  });
};

const dropTableZones = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='zones'",
        [],
        (tx, res) => {
          if (res.rows.length) {
            txn.executeSql("DROP TABLE IF EXISTS zones", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS zones(id INTEGER PRIMARY KEY AUTOINCREMENT, lugar VARCHAR(15), departamento VARCHAR(50), trabajadores NUMERIC(3), latitud NUMERIC(26,23), longitud NUMERIC(26,23))",
              [],
              (_, succes) => {
                resolve(succes);
              },
              (_, error) => {
                console.log("error dropping zones table", error);
                reject(error);
              }
            );
          }
        }
      );
    });
  });
};

const dropTableSupply = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='supply'",
        [],
        (tx, res) => {
          if (res.rows.length) {
            txn.executeSql("DROP TABLE IF EXISTS supply", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS supply(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (50), cantidad NUMERIC(4))",
              [],
              (_, succes) => {
                resolve(succes);
              },
              (_, error) => {
                console.log("error dropping supply table", error);
                reject(error);
              }
            );
          }
        }
      );
    });
  });
};

const dropTableObservacion = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='observacion'",
        [],
        (tx, res) => {
          if (res.rows.length) {
            txn.executeSql("DROP TABLE IF EXISTS observacion", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS observacion(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR (50), foto VARCHAR(400), latitud NUMERIC(5,2), longitud NUMERIC(5,2))",
              [],
              (_, succes) => {
                resolve(succes);
              },
              (_, error) => {
                console.log("error dropping observacion table", error);
                reject(error);
              }
            );
          }
        }
      );
    });
  });
};

const dropTableTratamientos = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tratamientos'",
        [],
        (tx, res) => {
          if (res.rows.length) {
            txn.executeSql("DROP TABLE IF EXISTS tratamientos", []);
            txn.executeSql(
              "CREATE TABLE tratamientos (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (50), zone INTEGER REFERENCES zones(id), user INTEGER references users (id), fechaIni VARCHAR(100), fechaFin VARCHAR (100), tiempo INT, orden VARCHAR (500), insumos VARCHAR (50), observaciones INTEGER REFERENCES observacion (id))",
              [],
              (_, succes) => {
                resolve(succes);
              },
              (_, error) => {
                console.log("error dropping tratamientos table", error);
                reject(error);
              }
            );
          }
        }
      );
    });
  });
};

// Crud usuario
const getUsers = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get users", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get users", succes);
          resolve(succes);
        }
      );
    });
  });
};

const insertUser = async (user) => {
  const { name, apellido, cedula, avatar } = user;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertUserSQL,
        [name, apellido, cedula, avatar],
        (_, succes) => {
          console.log("succes insert user", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error insert user", error);
          reject(error);
        }
      );
    });
  });
};

const editUser = (user) => {
  const { name, apellido, cedula, avatar } = user;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateUserSQL,
        [name, apellido, cedula, avatar],
        (_, succes) => {
          console.log("succes update user", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update user", error);
          reject(error);
        }
      );
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deletetUserSQL,
        [id],
        (_, succes) => {
          console.log("succes update user", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete user", error);
          reject(error);
        }
      );
    });
  });
};

// Crud zonas
const getZones = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM zones",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get zones", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get zones", succes);
          resolve(succes);
        }
      );
    });
  });
};

const insertZone = async (zone) => {
  const { lugar, departamento, trabajadores, latitud, longitud } = zone;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertZoneSQL,
        [lugar, departamento, trabajadores, latitud, longitud],
        (_, succes) => {
          console.log("succes insert zone", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error insert zone", error);
          reject(error);
        }
      );
    });
  });
};

const editZone = (zone) => {
  const { lugar, departamento, trabajadores, latitud, longitud } = zone;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateZoneSQL,
        [lugar, departamento, trabajadores, latitud, longitud],
        (_, succes) => {
          console.log("succes update user", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update user", error);
          reject(error);
        }
      );
    });
  });
};

const deleteZone = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deletetZoneSQL,
        [id],
        (_, succes) => {
          console.log("succes delete supply", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete supply", error);
          reject(error);
        }
      );
    });
  });
};


// Crud insumos
const getSupply = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM supply",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get supply", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get supply", succes);
          resolve(succes);
        }
      );
    });
  });
};

const insertSupply = async (supply) => {
  const { name, cantidad } = supply;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertSupplySQL,
        [name, cantidad],
        (_, succes) => {
          console.log("succes insert supply", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error insert supply", error);
          reject(error);
        }
      );
    });
  });
};

const editSupply = (supply) => {
  const { name, cantidad } = supply;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateSupplySQL,
        [name, cantidad],
        (_, succes) => {
          console.log("succes update supply", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update supply", error);
          reject(error);
        }
      );
    });
  });
};

const deleteSupply = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deleteSupplySQL,
        [id],
        (_, succes) => {
          console.log("succes delete Supply", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete supply", error);
          reject(error);
        }
      );
    });
  });
};

// Crud observaciones
const getObservacion = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM observacion",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get observacion", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get observacion", succes);
          resolve(succes);
        }
      );
    });
  });
};

const insertObservacion = async (observacion) => {
  const { titulo, foto, latitud, longitud } = observacion;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertObSQL,
        [titulo, foto, latitud, longitud],
        (_, succes) => {
          console.log("succes insert observacion", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error insert observacion", error);
          reject(error);
        }
      );
    });
  });
};

const editObservacion = (observacion) => {
  const { titulo, foto, latitud, longitud } = observacion;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateObSQL,
        [titulo, foto, latitud, longitud],
        (_, succes) => {
          console.log("succes update observacion", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update observacion", error);
          reject(error);
        }
      );
    });
  });
};

const deleteObservacion = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deleteObSQL,
        [id],
        (_, succes) => {
          console.log("succes delete observacion", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete observacion", error);
          reject(error);
        }
      );
    });
  });
};

// Crud tratamientos
const getTratamientos = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tratamientos",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get tratamientos", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get tratamientos", succes);
          resolve(succes);
        }
      );
    });
  });
};

const insertTratamiento = async (tratamiento) => {
  const { name, zone, user, fechaIni, fechaFin, tiempo, orden, insumos, observaciones } = tratamiento;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertTratamientoSQL,
        [name, zone, user, fechaIni, fechaFin, tiempo, orden, insumos, observaciones],
        (_, succes) => {
          console.log("succes insert tratamiento", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error insert tratamiento", error);
          reject(error);
        }
      );
    });
  });
};

const editTratamiento = (tratamiento) => {
  const { name, zone, user, fechaIni, fechaFin, tiempo, orden, insumos, observaciones } = tratamiento;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateObSQL,
        [name, zone, user, fechaIni, fechaFin, tiempo, orden, insumos, observaciones],
        (_, succes) => {
          console.log("succes update tratamiento", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update tratamiento", error);
          reject(error);
        }
      );
    });
  });
};

const deleteTratamiento = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deleteTratamientoSQL,
        [id],
        (_, succes) => {
          console.log("succes delete tratamiento", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete tratamiento", error);
          reject(error);
        }
      );
    });
  });
};

// FUNCIONES PARA IMPORTAR Y EXPORTAR
const importDB = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
  });
  if (result.type === "success") {
    console.log("result", result);
    // metodo FileSystem. getInfo para saber si tengo la carpeta creada
    const directory = FileSystem.documentDirectory + "SQLite";
    const folderExist = (await FileSystem.getInfoAsync(directory)).exists;
    if (!folderExist) {
      // crear la carpeta
      await FileSystem.makeDirectoryAsync(directory);
    }
    // Definir un base64
    const base64 = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // escribir el archivo
    await FileSystem.writeAsStringAsync(directory + "/database.db", base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }
};

const exportDB = async () => {
  const directory = FileSystem.documentDirectory + "SQLite";
  const folderExist = (await FileSystem.getInfoAsync(directory)).exists;

  if (Platform.OS === 'android' && folderExist) {
    const base64 = await FileSystem.readAsStringAsync(
      directory + "/database.db",
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    )
    const result = await FileSystem.StorageAccessFramework.createFileAsync(directory, "database.db", 'application/octet-stream')
    if (!result) {
      console.log('Error en permisos')
      return;
    }

    await FileSystem.writeAsStringAsync(
      result.uri,
      base64,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    )
    // compartir el archivo
    await Sharing.shareAsync(result.uri, {
      mimeType: 'application/octet-stream',
    })
  } else {
    await Sharing.shareAsync(directory + "/database.db")
  }
};

export const database = {
  setupTableUser,
  setupTableZone,
  setupTableSupply,
  setupTableObsevacion,
  setupTableTratamientos,
  dropTableUsers,
  dropTableZones,
  dropTableSupply,
  dropTableObservacion,
  dropTableTratamientos,
  setupZones,
  setupSupply,
  // crud usuarios
  getUsers,
  insertUser,
  editUser,
  deleteUser,
  // crud zonas
  getZones,
  insertZone,
  editZone,
  deleteZone,
  //crud insumos
  getSupply,
  insertSupply,
  editSupply,
  deleteSupply,
  //crud observaciones
  getObservacion,
  insertObservacion,
  editObservacion,
  deleteObservacion,
  //crud tratamientos
  getTratamientos,
  insertTratamiento,
  editTratamiento,
  deleteTratamiento,
  // importar y exportar
  importDB,
  exportDB,
  // abrir y cerrar db
  openDatabase,
  closeConnection
};