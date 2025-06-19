import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Hammer from 'hammerjs';
import { useEffect, useRef, useState } from 'react';

const profiles = [
  {
    id: 1,
    name: 'Ngọc Anh',
    age: 24,
    location: 'Hà Nội',
    bio: 'Thích du lịch và âm nhạc',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    name: 'Minh Đức',
    age: 28,
    location: 'TP.HCM',
    bio: 'Lập trình viên, thích thể thao',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    name: 'Thu Hà',
    age: 22,
    location: 'Đà Nẵng',
    bio: 'Sinh viên kinh tế, thích đọc sách',
    image:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

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

// const ActionButton = styled(IconButton)(({ theme, action }) => ({
//   width: 56,
//   height: 56,
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows[2],
//   '&:hover': {
//     backgroundColor: theme.palette.grey[200]
//   },
//   ...(action === 'like' && {
//     color: theme.palette.error.main
//   }),
//   ...(action === 'dislike' && {
//     color: theme.palette.primary.main
//   }),
//   ...(action === 'superlike' && {
//     color: theme.palette.warning.main
//   })
// }));

const TinderClone = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState('Vuốt card để bắt đầu');
  const cardRef = useRef<any>(null);
  const hammerRef = useRef<any>(null);

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
  }, [currentIndex]);
  const swipeDislike = () => {
    setStatus(`Bạn đã KHÔNG THÍCH ${profiles[currentIndex].name}`);
    // eslint-disable-next-line
    animateCardOut(-500);
    setTimeout(() => {
      goToNextCard();
    }, 500);
  };
  const swipeLike = () => {
    setStatus(`Bạn đã THÍCH ${profiles[currentIndex].name}!`);
    // eslint-disable-next-line
    animateCardOut(500);
    setTimeout(() => {
      // eslint-disable-next-line
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
    setStatus('Vuốt card để tiếp tục');
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

  const goToNextCard = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCard();
    } else {
      setStatus('Bạn đã xem hết tất cả profile!');
    }
  };

  const animateCardOut = (x = 0, y = 0) => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s ease, opacity 0.3s ease';
      cardRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.06}deg)`;
      cardRef.current.style.opacity = '0';
    }
  };

  // const superLike = () => {
  //   setStatus(`Bạn đã SUPER LIKE ${profiles[currentIndex].name}!`);
  //   animateCardOut(0, -500);
  //   setTimeout(() => {
  //     goToNextCard();
  //   }, 500);
  // };

  const resetProfiles = () => {
    setCurrentIndex(0);
    resetCard();
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom>
        Tinder Clone với Material-UI
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
          {currentIndex < profiles.length ? (
            <StyledCard ref={cardRef}>
              <CardMedia
                component="img"
                height="350"
                image={profiles[currentIndex].image}
                alt={profiles[currentIndex].name}
              />
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
                  color: 'white',
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {profiles[currentIndex].name}, {profiles[currentIndex].age}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {profiles[currentIndex].location}
                </Typography>
                <Typography variant="body1">{profiles[currentIndex].bio}</Typography>
              </CardContent>
            </StyledCard>
          ) : (
            <Card
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Bạn đã xem hết tất cả profile!
              </Typography>
              <Button variant="contained" color="primary" onClick={resetProfiles}>
                Xem lại từ đầu
              </Button>
            </Card>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          {/* <ActionButton 
            action="dislike"
            onClick={swipeDislike}
            aria-label="dislike"
          >
            <CloseIcon fontSize="large" />
          </ActionButton>
          
          <ActionButton 
            action="superlike"
            onClick={superLike}
            aria-label="super like"
          >
            <StarIcon fontSize="large" />
          </ActionButton>
          
          <ActionButton 
            action="like"
            onClick={swipeLike}
            aria-label="like"
          >
            <FavoriteIcon fontSize="large" />
          </ActionButton> */}
        </Box>

        <Typography variant="body1" color="text.secondary">
          {status}
        </Typography>
      </Box>
    </Container>
  );
};

export default TinderClone;
