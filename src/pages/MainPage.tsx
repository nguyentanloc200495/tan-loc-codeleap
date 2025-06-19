import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardMedia, Container, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingScreen from 'components/LoadingScreen';
import Hammer from 'hammerjs';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { getBreedByImagesId, randomBreed, voteImageById } from 'redux/slices/breed';
import { useDispatch, useSelector } from 'redux/store';
import uuidv4 from 'utils/uuidv4';

import DetailsModal from './DetailsModal';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 345,
  height: 500,
  position: 'relative',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  willChange: 'transform',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  overflow: 'hidden',
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 56,
  height: 56,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  border: `solid 1px ${theme.palette.grey[300]}`,
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

export default function MainPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { nextBreed, isLoading } = useSelector((state) => state.breed);
  const [currentBreed, setCurrentBreed] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const cardRef = useRef<any>(null);
  const hammerRef = useRef<any>(null);

  // get data breed
  useEffect(() => {
    dispatch(randomBreed());
    dispatch(getBreedByImagesId('_Qf9nfRzL'));

  }, [dispatch]);

  // set current breed data
  useEffect(() => {
    if (nextBreed?.length) {
      setCurrentBreed(nextBreed[0]);
    }
  }, [nextBreed]);

  // init hammer js
  useEffect(() => {
    if (cardRef.current) {
      const hammer = new Hammer(cardRef.current);
      hammerRef.current = hammer;
      hammer.get('swipe').set({
        direction: Hammer.DIRECTION_HORIZONTAL,
        threshold: 30,
        velocity: 0.1,
      });

      hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

      hammer.on('swipe', handleSwipe);
      hammer.on('pan', handlePan);
      hammer.on('panend', handlePanEnd);

      return () => {
        hammer.off('swipe', handleSwipe);
        hammer.off('pan', handlePan);
        hammer.off('panend', handlePanEnd);
        hammer.destroy();
      };
    }
  }, [cardRef.current]);

  const swipeDislike = () => {
    enqueueSnackbar('reject', { variant: 'error' });

    animateCardOut(-500);
    setTimeout(() => {
      goToNextCard(true);
    }, 500);
  };
  const swipeLike = () => {
    enqueueSnackbar('Like', { variant: 'success' });

    animateCardOut(500);
    setTimeout(() => {
      goToNextCard();
    }, 500);
  };

  const handleSwipe = (event: any) => {
    if (event.direction === Hammer.DIRECTION_LEFT) {
      swipeDislike();
    } else if (event.direction === Hammer.DIRECTION_RIGHT) {
      swipeLike();
    }
  };

  const handlePan = (event: any) => {
    if (!event.isFinal && cardRef?.current) {
      const { deltaX, deltaY } = event;
      cardRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)`;

      if (deltaX > 50) {
        cardRef.current.style.backgroundColor = '#ffebee';
      } else if (deltaX < -50) {
        cardRef.current.style.backgroundColor = '#e3f2fd';
      }
    }
  };
  const resetCard = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
      cardRef.current.style.transform = '';
      cardRef.current.style.opacity = '';
      cardRef.current.style.backgroundColor = '';
    }
  };

  const resetCardPosition = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.3s ease';
      cardRef.current.style.transform = '';
      cardRef.current.style.opacity = '';
      cardRef.current.style.backgroundColor = '';
    }
  };

  const handlePanEnd = (event: any) => {
    const { deltaX } = event;
    if (deltaX > 150) {
      swipeLike();
    } else if (deltaX < -150) {
      swipeDislike();
    } else if (cardRef.current) {
      resetCardPosition();
    }
  };

  const goToNextCard = (isReject: boolean = false) => {
    dispatch(randomBreed());
    resetCard();
    setTimeout(() => {
      if (currentBreed?.id) {
        const voteParams = {
          image_id: currentBreed.id,
          sub_id: uuidv4(),
          value: isReject ? -1 : 1,
        };
        dispatch(voteImageById(voteParams));
      }
    }, 100);
  };

  const animateCardOut = (x = 0, y = 0) => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s ease, opacity 0.3s ease';
      cardRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.06}deg)`;
      cardRef.current.style.opacity = '0';
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom>
        DogFinder
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 345,
            height: 500,
          }}
        >
          <StyledCard ref={cardRef}>
            <CardMedia
              component="img"
              height="400"
              image={currentBreed.url}
              alt={currentBreed.url}
            />

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: 'center', mt: 1 }}
            >
              Swiping here!
            </Typography>
          </StyledCard>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          <ActionButton sx={{ color: 'primary.main' }} onClick={swipeDislike}>
            <CloseIcon fontSize="large" />
          </ActionButton>
          {currentBreed?.breeds?.length > 0 && (
            <ActionButton sx={{ color: 'primary.main' }} onClick={handleOpen}>
              <VisibilityIcon fontSize="large" />
            </ActionButton>
          )}

          <ActionButton sx={{ color: 'error.main' }} onClick={swipeLike}>
            <FavoriteIcon fontSize="large" />
          </ActionButton>
        </Box>

        <Typography variant="body1" color="text.secondary">
          Swiping left to reject and swiping right to like.
        </Typography>
      </Box>
      {open && <DetailsModal open={open} onClose={handleClose} data={currentBreed} />}
      {isLoading && <LoadingScreen />}
    </Container>
  );
}
