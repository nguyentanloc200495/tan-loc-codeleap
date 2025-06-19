import { memo } from 'react';
// mui
import { Box, Card, CardMedia, Dialog, IconButton, styled, Typography } from '@mui/material';
// components

import Iconify from 'components/Iconify';
import Scrollbar from 'components/Scrollbar';

// ----------------------------------------------------------------------

const Container = styled(Box)(() => ({
  width: '100%',
  padding: '40px',
  
}));
const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: 500,
  display: 'flex',
  position: 'relative',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  willChange: 'transform',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },

  gap: 10,
}));

type Props = {
  open: boolean;
  onClose: VoidFunction;
  data: any;
};

function DetailsModal({ data, open, onClose }: Props) {
  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
              <IconButton onClick={onClose} sx={{ position: 'absolute', right: 0 }}>
          <Iconify icon="eva:close-fill" width={20} height={20} />
        </IconButton>
      <Container>

        <Box>
          <Scrollbar>
            <StyledCard>
              <CardMedia component="img" width="400" image={data?.url} alt={data?.url} />
              <Box>
                     <Typography gutterBottom variant="h5" component="div">
                  <b> Name:</b> {data?.breeds[0]?.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  <b> Weight:</b> {data?.breeds[0]?.weight?.metric}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  <b>Bred for:</b> {data?.breeds[0]?.bred_for}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  <b> Breed Group:</b> {data?.breeds[0]?.breed_group}
                </Typography>

                <Typography gutterBottom variant="body1" component="div">
                  <b> Life Span:</b> {data?.breeds[0]?.life_span}
                </Typography>

                <Typography gutterBottom variant="body1" component="div">
                  <b> Temperament: </b>
                  {data?.breeds[0]?.temperament}
                </Typography>
              </Box>
            </StyledCard>
          </Scrollbar>
        </Box>
      </Container>
    </Dialog>
  );
}

export default memo(DetailsModal);
