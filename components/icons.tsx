import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconMusicNote(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 18a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" transform="translate(0 -2)" />
      <path d="M11.5 7.5v8" />
      <path d="M11.5 7.5 19 6v8" />
      <path d="M16.5 14.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" transform="translate(0 -2)" />
    </IconBase>
  );
}

export function IconHome(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.8V21h13V9.8" />
    </IconBase>
  );
}

export function IconAt(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M16 12v2a2 2 0 1 1-2-2" />
      <path d="M10.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0" />
    </IconBase>
  );
}

export function IconShare(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="18" cy="5" r="2.2" />
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="18" cy="19" r="2.2" />
      <path d="M8 11l8-5" />
      <path d="M8 13l8 5" />
    </IconBase>
  );
}

export function IconGroups(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3.5 18a4.5 4.5 0 0 1 9 0" />
      <path d="M11.5 18a4.5 4.5 0 0 1 9 0" />
    </IconBase>
  );
}

export function IconComedy(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="5" y="4.5" width="14" height="15" rx="2" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M8.5 14c1 .9 2.2 1.4 3.5 1.4s2.5-.5 3.5-1.4" />
    </IconBase>
  );
}

export function IconMail(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 8l9 6 9-6" />
    </IconBase>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7.5 4.5h3l1 3-1.8 1.8a13 13 0 0 0 5 5l1.8-1.8 3 1v3a2 2 0 0 1-2.2 2c-7.3-.6-13.2-6.5-13.8-13.8a2 2 0 0 1 2-2.2z" />
    </IconBase>
  );
}

export function IconCamera(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.2" />
    </IconBase>
  );
}

export function IconArrowForward(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function IconArrowBack(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </IconBase>
  );
}

export function IconStars(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 1.9 3.9L18 9l-4.1 2.1L12 15l-1.9-3.9L6 9l4.1-2.1z" />
      <path d="m19 14 .8 1.6L21.5 16l-1.7.8L19 18.5l-.8-1.7-1.7-.8 1.7-.4z" />
      <path d="m5 14 .8 1.6L7.5 16l-1.7.8L5 18.5l-.8-1.7-1.7-.8 1.7-.4z" />
    </IconBase>
  );
}

export function IconLocation(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10z" />
      <circle cx="12" cy="11" r="2" />
    </IconBase>
  );
}

export function IconSchedule(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </IconBase>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="9" y="9" width="10" height="10" rx="2" />
      <rect x="5" y="5" width="10" height="10" rx="2" />
    </IconBase>
  );
}

export function IconOpenInNew(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
    </IconBase>
  );
}

export function IconSend(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 11.5 21 3l-7.5 18-2.8-6.7L3 11.5z" />
      <path d="M10.7 14.3 21 3" />
    </IconBase>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4v10" />
      <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
      <path d="M5 19h14" />
    </IconBase>
  );
}
