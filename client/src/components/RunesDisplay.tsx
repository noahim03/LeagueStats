import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function RunesDisplay() {
  const [runeData, setRuneData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRuneData = async () => {
      const { data, error } = await supabase
        .from('runes')
        .select('*');
      if (error) {
        console.error('Error fetching rune data:', error);
      } else {
        setRuneData(data);
      }
      setLoading(false);
    };

    fetchRuneData();
  }, []);

  if (loading) {
    return <div className="text-center text-lol-gray py-6">Loading...</div>;
  }

  if (!runeData || runeData.length === 0) {
    return <div className="text-center text-lol-gray py-6">No rune data available.</div>;
  }

  return (
    <div className="text-center text-lol-gray py-6">
      <p>Rune data loaded successfully!</p>
    </div>
  );
}