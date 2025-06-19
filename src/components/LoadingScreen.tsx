import { m } from 'framer-motion';

// @mui
import { Box, SxProps } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

//
import ProgressBar from './ProgressBar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

type Props = {
  isDashboard?: boolean;
  sx?: SxProps;
};

export default function LoadingScreen({ isDashboard, ...other }: Props) {
  return (
    <>
      <ProgressBar />

      {!isDashboard && (
        <RootStyle {...other}>
          <m.div
            animate={{
              scale: [1, 0.9, 0.9, 1, 1],
              opacity: [1, 0.48, 0.48, 1, 1],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeatDelay: 1,
              repeat: Infinity,
            }}
          >

            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="24px" height="30px" viewBox="0 0 24 30"  >
              <rect x="0" y="13" width="4" height="5" fill="#333">
                <animate attributeName="height" attributeType="XML"
                  values="5;21;5"
                  begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                  values="13; 5; 13"
                  begin="0s" dur="0.6s" repeatCount="indefinite" />
              </rect>
              <rect x="10" y="13" width="4" height="5" fill="#333">
                <animate attributeName="height" attributeType="XML"
                  values="5;21;5"
                  begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                  values="13; 5; 13"
                  begin="0.15s" dur="0.6s" repeatCount="indefinite" />
              </rect>
              <rect x="20" y="13" width="4" height="5" fill="#333">
                <animate attributeName="height" attributeType="XML"
                  values="5;21;5"
                  begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                  values="13; 5; 13"
                  begin="0.3s" dur="0.6s" repeatCount="indefinite" />
              </rect>
            </svg>


          </m.div>

          <Box
            component={m.div}
            animate={{
              scale: [1.2, 1, 1, 1.2, 1.2],
              rotate: [270, 0, 0, 270, 270],
              opacity: [0.25, 1, 1, 1, 0.25],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
            sx={{
              width: 100,
              height: 100,
              borderRadius: '25%',
              position: 'absolute',
              border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
            }}
          />

          <Box
            component={m.div}
            animate={{
              scale: [1, 1.2, 1.2, 1, 1],
              rotate: [0, 270, 270, 0, 0],
              opacity: [1, 0.25, 0.25, 0.25, 1],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{
              ease: 'linear',
              duration: 3.2,
              repeat: Infinity,
            }}
            sx={{
              width: 120,
              height: 120,
              borderRadius: '25%',
              position: 'absolute',
              border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
            }}
          />
        </RootStyle>
      )}
    </>
  );
}
