'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

/**
 * Loads one of the signed-in customer's tables (orders, addresses, quote_requests).
 * Row Level Security in supabase/schema.sql guarantees they only get their own rows.
 */
export function useTable(table, { order = 'created_at', ascending = false } = {}) {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(Boolean(getSupabase()));
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb || !user) return;
    let active = true;
    sb.from(table)
      .select('*')
      .order(order, { ascending })
      .then(({ data, error: err }) => {
        if (!active) return;
        setRows(data || []);
        setError(err ? 'We couldn’t load this right now. Please refresh to try again.' : '');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [table, order, ascending, user, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);
  return { rows, loading: loading && Boolean(user), error, reload };
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const ORDER_STATUS = {
  paid: { label: 'Paid', tone: 'bg-primary-fixed text-on-primary-fixed-variant' },
  in_production: { label: 'In the workshop', tone: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  dispatched: { label: 'On its way', tone: 'bg-secondary-container text-on-secondary-container' },
  delivered: { label: 'Delivered', tone: 'bg-surface-container-high text-on-surface' },
  cancelled: { label: 'Cancelled', tone: 'bg-error-container text-on-error-container' },
};

export const QUOTE_STATUS = {
  received: { label: 'Received', tone: 'bg-primary-fixed text-on-primary-fixed-variant' },
  quoted: { label: 'Quote sent', tone: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  in_production: { label: 'In production', tone: 'bg-secondary-container text-on-secondary-container' },
  completed: { label: 'Completed', tone: 'bg-surface-container-high text-on-surface' },
};
