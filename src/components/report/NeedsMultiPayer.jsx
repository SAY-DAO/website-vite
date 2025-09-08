/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */

// FILE: src/components/NeedsMultiPayer.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Chip,
  Tooltip,
  Divider,
  CircularProgress,
  Stack,
  useTheme,
} from '@mui/material';

import RefreshIcon from '@mui/icons-material/Refresh';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchMultiPayerNeeds } from '../../features/needsSlice';
import { prepareUrl } from '../../utils/helpers';

// Helper: compute distinct payer count for a need
const getPayerCount = (need) => {
  if (!need.payments || need.payments.length === 0) return 0;
  const set = new Set();
  need.payments.forEach((p) => {
    if (p.id_user) set.add(p.id_user);
  });
  return set.size;
};

// Helper: format date
const fmtDate = (iso) => {
  if (!iso) return '-';
  return new Date(iso).toLocaleString();
};

export default function NeedsMultiPayer({ max = 10000 }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { items = [], status } = useSelector((s) => s.needs) || {};
  const [limit, setLimit] = useState(max);

  useEffect(() => {
    dispatch(fetchMultiPayerNeeds(limit));
  }, [dispatch, limit]);

  const safeItems = Array.isArray(items) ? items : [];

  // 🔥 Top 8 needs sorted by most distinct payers
  const chartData = useMemo(
    () =>
      [...safeItems]
        .sort((a, b) => getPayerCount(b) - getPayerCount(a))
        .slice(0, 8)
        .map((n) => ({
          name: `#${n.id}`,
          payers: getPayerCount(n),
          cost: n._cost || 0,
        })),
    [safeItems],
  );

  // 🔥 Top 3 collaborations sorted by most distinct payers
  const topCollaborations = useMemo(
    () =>
      [...safeItems]
        .sort((a, b) => getPayerCount(b) - getPayerCount(a))
        .slice(0, 3),
    [safeItems],
  );

  return (
    <Box sx={{ p: 2 }}>
      <Card elevation={6} sx={{ borderRadius: 2, maxHeight: 680 }}>
        <CardHeader
          title={
            <Typography variant="h6">Needs with multiple payers</Typography>
          }
          subheader={
            <Typography variant="body2">
              Last {limit} needs where at least two people paid
            </Typography>
          }
          action={
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Refresh">
                <IconButton
                  onClick={() => dispatch(fetchMultiPayerNeeds(limit))}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {status === 'loading' ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <List disablePadding>
                  {safeItems.map((need) => (
                    <React.Fragment key={need.id}>
                      <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{ bgcolor: theme.palette.secondary.main }}
                            src={prepareUrl(need.imageUrl)}
                          >
                            {need.title
                              ? need.title[0].toUpperCase()
                              : String(need.id)[0]}
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <Typography variant="subtitle1">
                                {need.title ||
                                  need.name_translations?.en ||
                                  `Need #${need.id}`}
                              </Typography>
                              <Chip
                                label={`${getPayerCount(need)} payers`}
                                size="small"
                              />
                              <Chip
                                label={`€ ${need._cost ?? 0}`}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Created: {fmtDate(need.created)}
                              </Typography>
                              <br />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Delivery:{' '}
                                {need.child_delivery_date
                                  ? fmtDate(need.child_delivery_date)
                                  : '—'}
                              </Typography>
                            </>
                          }
                        />

                        <Box
                          sx={{
                            ml: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                          }}
                        >
                          <Tooltip title="More info">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Card sx={{ p: 1, height: 260 }}>
                  <Typography variant="subtitle1" sx={{ px: 1, pt: 1 }}>
                    Payer counts (top 8)
                  </Typography>
                  <Box sx={{ height: 200, px: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <ReTooltip />
                        <Bar
                          dataKey="payers"
                          barSize={20}
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Card>

                <Card sx={{ p: 1 }}>
                  <Typography variant="subtitle1" sx={{ px: 1, pt: 1 }}>
                    Top collaborations
                  </Typography>

                  <Box sx={{ px: 1, py: 1 }}>
                    {topCollaborations.map((need) => (
                      <Box key={need.id} sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {need.title || `Need #${need.id} - ${need._cost.toLocaleString()}`} —{' '}
                          {getPayerCount(need)} payers
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          {[
                            ...new Map(
                              (need.payments || []).map((p) => [p.id_user, p]),
                            ).values(),
                          ]
                            .slice(0, 5)
                            .map((p) => (
                              <Tooltip
                                key={p.id_user}
                                title={`${p.need_amount.toLocaleString() || ''} `}
                              >
                                <Avatar
                                  sx={{ width: 32, height: 32 }}
                                  src={p.familyMember?.avatarUrl}
                                >
                                  {p.familyMember
                                    ? (p.familyMember.firstName || 'U')[0]
                                    : String(p.id_user || 'U')[0]}
                                </Avatar>
                              </Tooltip>
                            ))}
                          <Typography variant="body2" sx={{ fontSize: 9 }}>
                            تومان
                            {[
                              ...new Map(
                                (need.payments || []).map((p) => [
                                  p.id_user,
                                  p,
                                ]),
                              ).values(),
                            ]
                              .reduce((sum, p) => sum + (p.need_amount || 0), 0)
                              .toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
