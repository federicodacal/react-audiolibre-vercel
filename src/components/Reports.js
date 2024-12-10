import React, { useEffect, useState } from 'react';
import { getReportPurchases, getReportUsers, getReportAudios, getReportCreators } from '../services/reportsService';

const ReportsPage = () => {
  const [purchasesReport, setPurchasesReport] = useState(null);
  const [usersReport, setUsersReport] = useState(null);
  const [audiosReport, setAudiosReport] = useState(null);
  const [creatorsReport, setCreatorsReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [purchases, users, audios, creators] = await Promise.all([
          getReportPurchases(),
          getReportUsers(),
          getReportAudios(),
          getReportCreators(),
        ]);
        setPurchasesReport(purchases);
        setUsersReport(users);
        setAudiosReport(audios);
        setCreatorsReport(creators);
      } catch (err) {
        setError('Error al cargar los reportes. Intente nuevamente.');
        console.error(err);
      }
    };

    fetchReports();
  }, []);

  if (error) return <div style={styles.error}>{error}</div>;
  if (!purchasesReport || !usersReport || !audiosReport || !creatorsReport) return <div style={styles.loading}>Cargando reportes...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reportes</h1>

      {/* Purchases Report */}
      <section style={styles.card}>
        <h2 style={styles.subtitle}>Reporte de Ventas</h2>
        <p><strong>Ventas Totales:</strong> {purchasesReport.total_purchases}</p>
        <p><strong>Total $:</strong> ${purchasesReport.total_price}</p>
        <h3 style={styles.sectionHeader}>Ventas por Categoría:</h3>
        <ul>
          {purchasesReport.total_price_by_category_and_genre.by_category.map((item) => (
            <li key={item.category}>
              <strong>{item.category}:</strong> ${item.total_price}
            </li>
          ))}
        </ul>
        <h3 style={styles.sectionHeader}>Audios Más Vendidos:</h3>
        <ul>
          {purchasesReport.most_sold_audios.map((audio) => (
            <li key={audio.audio_id}>
              {audio.audio_name} - <strong>Ventas:</strong> {audio.total_sales}
            </li>
          ))}
        </ul>
      </section>

      {/* Users Report */}
      <section style={styles.card}>
        <h2 style={styles.subtitle}>Reporte de Usuarios</h2>
        <p><strong>Total de Usuarios:</strong> {usersReport.users_by_status.total_users}</p>
        <p><strong>Usuarios Activos:</strong> {usersReport.users_by_status.active_users}</p>
        <p><strong>Usuarios Inactivos:</strong> {usersReport.users_by_status.inactive_users}</p>
        <h3 style={styles.sectionHeader}>Usuarios por Tipo:</h3>
        <ul>
          {Object.entries(usersReport.users_by_type).map(([type, count]) => (
            <li key={type}>
              <strong>{type}:</strong> {count}
            </li>
          ))}
        </ul>
      </section>

      {/* Audios Report */}
      <section style={styles.card}>
        <h2 style={styles.subtitle}>Reporte de Audios</h2>
        <p><strong>Total de Audios:</strong> {audiosReport.total_audios}</p>
        <h3 style={styles.sectionHeader}>Audios Más Favoritos:</h3>
        <ul>
          {audiosReport.most_favorited_audios.map((audio, index) => (
            <li key={index}>
              {audio.audio_name} - <strong>Favoritos:</strong> {audio.favorites_count}
            </li>
          ))}
        </ul>
        <h3 style={styles.sectionHeader}>Puntajes Más Altos:</h3>
        <ul>
          {audiosReport.top_score_audios.map((audio, index) => (
            <li key={index}>
              {audio.audio_name} - <strong>Puntaje:</strong> {audio.score}
            </li>
          ))}
        </ul>
      </section>

      {/* Creators Report */}
      <section style={styles.card}>
        <h2 style={styles.subtitle}>Reporte de Creadores</h2>
        <h3 style={styles.sectionHeader}>Creadores por Puntos:</h3>
        <ul>
          {creatorsReport.top_creators_by_points.map((creator) => (
            <li key={creator.creator}>
              {creator.full_name} ({creator.username}) - <strong>Puntos:</strong> {creator.points}
            </li>
          ))}
        </ul>
        <h3 style={styles.sectionHeader}>Creadores por Ventas:</h3>
        <ul>
          {creatorsReport.top_creators_by_purchases.map((creator) => (
            <li key={creator.creator}>
              {creator.full_name} ({creator.username}) - <strong>Ventas Totales:</strong> ${creator.total_sales}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  subtitle: {
    color: '#555',
    marginBottom: '10px',
    borderBottom: '2px solid #ddd',
    paddingBottom: '5px',
  },
  sectionHeader: {
    color: '#777',
    marginTop: '15px',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '50px',
  },
  loading: {
    color: '#333',
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '50px',
  },
};

export default ReportsPage;
