import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const serverVersion = await database.query("SHOW server_version;");

  const maxConnections = await database.query("SHOW max_connections;");

  /* Alterei esta consulta para usar query parametrizada, evitando SQL Injection
  const OpenConnections = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = current_database();",
  );
  */

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({
    update_at: updateAt,
    server_version: serverVersion.rows[0].server_version,
    max_connections: parseInt(maxConnections.rows[0].max_connections),
    open_connections: parseInt(databaseOpenedConnectionsResult.rows[0].count),
  });
}

export default status;
