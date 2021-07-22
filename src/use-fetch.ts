import { useState, useEffect } from "react";

const getUrl = (year: string) => `https://ergast.com/api/f1/${year}/driverStandings.json`;

interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

interface Standings {
  Driver: Driver;
  points: string;
}

const useFetch = (year: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Standings[]>();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function go() {
      try {
        setLoading(true);
        const url = getUrl(year);

        const response = await fetch(url);
        const raw = await response.json();
        setData(raw['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    go();
  }, [year]);

  return { loading, data, error };
};

export default useFetch;
