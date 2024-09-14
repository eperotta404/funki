import type { CardProps } from '@mui/material/Card';
import type { TimelineItemProps } from '@mui/lab/TimelineItem';

import { useState } from 'react';

import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import { Pagination } from '@mui/material';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    type: string;
    title: string;
    time: string | number | null;
  }[];
  itemsPerPage?: number;
};

export function AnalyticsTimeline({ title, subheader, list, itemsPerPage = 4, ...other }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  const paginatedList = list.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} titleTypographyProps={{ variant: 'h5' }}  />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          height: 300,
          overflow: 'hidden',
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {paginatedList.map((item, index) => (
          <Item key={item.id} item={item} lastItem={index === list.length - 1} />
        ))}
      </Timeline>
      <Pagination
        color="primary"
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  item: Props['list'][number];
};

function Item({ item, lastItem, ...other }: ItemProps) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          color={
            (item.type === 'type1' && 'primary') ||
            (item.type === 'type2' && 'success') ||
            (item.type === 'type3' && 'info') ||
            (item.type === 'type4' && 'warning') ||
            'error'
          }
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="h6">{item.title}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {fDateTime(item.time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
