/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from 'recharts';
import { Typography } from '@mui/material';
import moment from 'moment-jalaali';

const farsiMonthMap = {
  فروردین: 0,
  اردیبهشت: 1,
  خرداد: 2,
  تیر: 3,
  مرداد: 4,
  شهریور: 5,
  مهر: 6,
  آبان: 7,
  آذر: 8,
  دی: 9,
  بهمن: 10,
  اسفند: 11,
};
// Make sure to load moment-jalaali plugin
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

export function normalizeRateData(rawInput) {
  const raw = Array.isArray(rawInput) ? rawInput : [];
  return raw.map((d) => {
    const previous = Number(d && d.previous != null ? d.previous : 0);
    const current = Number(d && d.current != null ? d.current : 0);
    let rate = null;
    let isNew = false;

    if (previous === 0) {
      isNew = current > 0;
      rate = null; // undefined/infinite change
    } else {
      rate = ((current - previous) / previous) * 100;
    }

    return {
      period: (d && (d.period ?? d.label)) || '-',
      previous,
      current,
      rate,
      isNew,
    };
  });
}

export function computeSeasonKPI(data) {
  const arr = Array.isArray(data) ? data : [];
  let prevTotal = 0;
  let currTotal = 0;
  for (const d of arr) {
    prevTotal += Number(d.previous || 0);
    currTotal += Number(d.current || 0);
  }
  const pct = prevTotal === 0
    ? currTotal > 0
      ? null
      : 0
    : ((currTotal - prevTotal) / prevTotal) * 100;
  return { prevTotal, currTotal, pct };
}

function computeYDomain(data) {
  const values = (Array.isArray(data) ? data : [])
    .map((d) => d.rate)
    .filter((v) => typeof v === 'number' && Number.isFinite(v));
  if (values.length === 0) {
    return [-10, 10];
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = Math.max(Math.abs(min), Math.abs(max)) * 0.1;
  return [
    Math.min(0, Math.floor(min - pad)),
    Math.max(0, Math.ceil(max + pad)),
  ];
}

const selectSeasonComparison = (state) => {
  try {
    if (!state || typeof state !== 'object') return null;
    const { users } = state;
    if (!users || typeof users !== 'object') return null;
    const arr = users.seasonComparison;
    return Array.isArray(arr) ? arr : null;
  } catch (e) {
    return e;
  }
};

export default function ReportCart1({
  data: propData,
  reduxSelector = selectSeasonComparison,
  title,
  season,
}) {
  const reduxData = useSelector(reduxSelector);
  const raw = useMemo(() => {
    if (Array.isArray(propData) && propData.length) return propData;
    if (Array.isArray(reduxData) && reduxData.length) return reduxData;
    return [];
  }, [propData, reduxData]);

  const data = useMemo(() => {
    const currentJalaliYear = moment().jYear();
    const currentJalaliMonth = moment().jMonth();
    // Convert season Gregorian year to Jalali year using mid-year date
    const seasonJalaliYear = moment(`${season}-06-01`, 'YYYY-MM-DD').jYear();
    const normalized = normalizeRateData(raw);
    if (seasonJalaliYear === currentJalaliYear) {
      return normalized.filter((entry) => {
        const monthName = entry.period?.trim();
        const monthIndex = farsiMonthMap[monthName];
        return monthIndex != null && monthIndex <= currentJalaliMonth;
      });
    }
    return normalized;
  }, [raw, season]);

  const seasonKPI = useMemo(() => computeSeasonKPI(data), [data]);
  const yDomain = useMemo(() => computeYDomain(data), [data]);

  const fmtPct = (v) => (v == null ? '—' : `${v.toFixed(1)}%`);
  const barColor = (rate, isNew) => {
    if (isNew) return '#9CA3AF';
    if (rate == null) return '#9CA3AF';
    return rate >= 0 ? '#10B981' : '#EF4444';
  };

  const hasData = data.some((d) => d.previous !== 0 || d.current !== 0);

  return (
    <div
      style={{ textAlign: 'center', direction: 'ltr' }}
      className="w-full max-w-3xl bg-white/80 dark:bg-slate-900/70 rounded-2xl p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h4 className="text-lg font-semibold">
            {title ?? 'Users: season vs previous'}
          </h4>
        </div>

        <div className="text-right">
          <Typography
            variant="h5"
            fontWeight={500}
            color={seasonKPI.pct >= 0 ? 'success.main' : 'error.main'}
          >
            {seasonKPI.pct >= 0
              ? `+${seasonKPI.pct.toFixed(1)}%`
              : `${seasonKPI.pct.toFixed(1)}%`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            مجموع
            {' '}
            {seasonKPI.currTotal.toLocaleString()}
            {' '}
            در سال
            {' '}
            {season}
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            مجموع
            {' '}
            {seasonKPI.prevTotal.toLocaleString()}
            {' '}
            در سال
            {' '}
            {season - 1}
          </Typography>
        </div>
      </div>
      <div style={{ height: 260 }}>
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 12, right: 12, left: 0, bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E6E9EE" />
              <XAxis dataKey="period" tick={{ fontSize: 8 }} />
              <YAxis
                tickFormatter={(v) => `${v}%`}
                domain={yDomain}
                width={40}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  if (name === 'rate') {
                    const entry = props && props.payload ? props.payload : {};
                    if (entry && entry.isNew) return ['New users', 'Change'];
                    return [fmtPct(value), 'Change'];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => `Period: ${label}`}
              />
              <ReferenceLine y={0} stroke="#94A3B8" strokeDasharray="3 3" />
              <Bar dataKey="rate" minPointSize={4} radius={[6, 6, 6, 6]}>
                {data.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={barColor(entry.rate, entry.isNew)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-slate-500">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}
