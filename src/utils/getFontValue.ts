// @mui
import { useTheme } from '@mui/material/styles';
import { Variant } from '@mui/material/styles/createTypography';
// hooks
import useResponsive from 'hooks/useResponsive';

// ----------------------------------------------------------------------

function useWidth() {
  const reponsiveXl = useResponsive('up', 'xl');
  const reponsiveLg = useResponsive('up', 'lg');
  const reponsiveMd = useResponsive('up', 'md');
  const reponsiveSm = useResponsive('up', 'sm');
  const reponsiveXs = useResponsive('up', 'xs');
  if (reponsiveXl) return 'xl';
  if (reponsiveLg) return 'lg';
  if (reponsiveMd) return 'md';
  if (reponsiveSm) return 'sm';
  if (reponsiveXs) return 'xs';
  return 'xs';
}

// ----------------------------------------------------------------------

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

// ----------------------------------------------------------------------

export default function GetFontValue(variant: Variant) {
  const theme = useTheme();
  const breakpoints = useWidth();

  const key = theme.breakpoints.up(breakpoints === 'xl' ? 'xl' : breakpoints);

  const hasResponsive =
    variant === 'h1' ||
    variant === 'h2' ||
    variant === 'h3' ||
    variant === 'h4' ||
    variant === 'h5' ||
    variant === 'h6';

  const getFont: any =
    hasResponsive && theme.typography[variant][key]
      ? theme.typography[variant][key]
      : theme.typography[variant];

  const fontSize = remToPx(getFont.fontSize);
  const lineHeight = Number(theme.typography[variant].lineHeight) * fontSize;
  const { fontWeight, letterSpacing } = theme.typography[variant];

  return { fontSize, lineHeight, fontWeight, letterSpacing };
}

// ----------------------------------------------------------------------
