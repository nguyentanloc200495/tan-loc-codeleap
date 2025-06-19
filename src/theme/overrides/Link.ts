import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Link(theme: Theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          color: `${theme.palette.common.dark}!important`,
          fontWeight: theme.typography.fontWeightBold,
          '&.link-underline': {
            position: 'relative',
            '&.MuiLink-underlineHover': {
              textDecoration: 'none !important',
            },
            '&::after': {
              content: "''",
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 1,
              backgroundColor: theme.palette.common.dark,
              width: '100%',
            },
          },
        },
      },
    },
  };
}
