// Как использовать, если нужно изменить цвет и размер <Avatar size={50} color="red" />

export default function Avatar({ size = 28, color = "#2F2F2F" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g stroke={color} clipPath="url(#a)">
        <circle cx="12" cy="12" r="11.5" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 7.077c0 .816-.316 1.599-.878 2.176a2.963 2.963 0 0 1-2.122.9 2.963 2.963 0 0 1-2.122-.9A3.117 3.117 0 0 1 9 7.077c0-.816.316-1.599.878-2.176A2.963 2.963 0 0 1 12 4c.796 0 1.559.324 2.122.901.562.577.878 1.36.878 2.176ZM6 18.66a6.23 6.23 0 0 1 1.792-4.286A5.925 5.925 0 0 1 12 12.608c1.575 0 3.086.634 4.208 1.767A6.23 6.23 0 0 1 18 18.66 14.047 14.047 0 0 1 12 20c-2.141 0-4.173-.48-6-1.34Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
