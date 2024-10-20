// Как использовать, если нужно изменить цвет и размер <Glasses width={33} height={40} color="red" />

export default function Glasses({
  width = 23,
  height = 30,
  color = "#407BFF",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <path
        fill={color}
        d="M.26.13 2.4 29.79v.08h18.412L22.951.224V.13H.26ZM20.057 29.04H3.162L1.558 6.824h.881l1.45 19.578c.01.103.055.199.13.27.075.07.173.11.275.11h.034a.4.4 0 0 0 .277-.14.41.41 0 0 0 .098-.298l-1.45-19.52H21.66l-1.604 22.215Zm1.66-23.046H3.19l-.318-4.328a.423.423 0 0 0-.137-.274.412.412 0 0 0-.284-.106.413.413 0 0 0-.276.145.425.425 0 0 0-.1.299l.319 4.27H1.5L1.137.956H22.08l-.364 5.037Z"
      />
      <path
        fill={color}
        d="M6.78 10.932c.265 0 .524-.08.745-.23.221-.149.393-.362.495-.61a1.38 1.38 0 0 0-.291-1.485 1.325 1.325 0 0 0-1.463-.295 1.347 1.347 0 0 0-.603.502 1.376 1.376 0 0 0 .167 1.72c.252.255.593.398.95.398Zm0-1.898a.524.524 0 0 1 .488.331.544.544 0 0 1-.115.585.526.526 0 0 1-.903-.38.54.54 0 0 1 .155-.38c.1-.1.234-.156.374-.156ZM6.774 15.358c.003.269.085.53.235.752.15.222.36.394.607.494a1.325 1.325 0 0 0 1.457-.309 1.38 1.38 0 0 0 .28-1.484 1.358 1.358 0 0 0-.497-.607 1.329 1.329 0 0 0-1.697.182 1.364 1.364 0 0 0-.385.972Zm1.865 0a.542.542 0 0 1-.326.496.522.522 0 0 1-.577-.117.54.54 0 0 1 .375-.916c.14 0 .274.057.374.157.099.101.155.238.155.38ZM16.313 15.392c.265 0 .525-.08.745-.23.221-.149.393-.361.495-.61a1.38 1.38 0 0 0-.291-1.484 1.325 1.325 0 0 0-1.463-.295 1.347 1.347 0 0 0-.602.501 1.376 1.376 0 0 0 .167 1.72c.251.255.593.398.949.398Zm0-1.892a.524.524 0 0 1 .489.332.543.543 0 0 1-.117.586.527.527 0 0 1-.901-.387.54.54 0 0 1 .157-.376.525.525 0 0 1 .372-.155ZM11.637 12.825c.266 0 .525-.08.746-.23.22-.15.393-.362.494-.61a1.38 1.38 0 0 0-.29-1.485 1.324 1.324 0 0 0-1.463-.295 1.347 1.347 0 0 0-.603.501 1.376 1.376 0 0 0 .167 1.72c.252.255.593.399.95.399Zm0-1.899a.524.524 0 0 1 .489.332.544.544 0 0 1-.115.584.527.527 0 0 1-.576.117.532.532 0 0 1-.327-.496.542.542 0 0 1 .32-.522.522.522 0 0 1 .21-.043v.028ZM9.078 20.545c.005.221.075.436.2.617s.3.321.504.402a1.095 1.095 0 0 0 1.198-.262 1.13 1.13 0 0 0 .229-1.223 1.123 1.123 0 0 0-.41-.5 1.098 1.098 0 0 0-.612-.188 1.13 1.13 0 0 0-.786.348 1.163 1.163 0 0 0-.323.806Zm1.109-.3a.292.292 0 0 1 .273.185.304.304 0 0 1-.064.327.295.295 0 0 1-.505-.212c0-.08.031-.156.087-.212a.294.294 0 0 1 .209-.088ZM14.441 19.293c.228.008.453-.053.646-.177.193-.123.345-.302.436-.514a1.17 1.17 0 0 0-.234-1.274 1.133 1.133 0 0 0-1.254-.25c-.21.09-.387.243-.51.437a1.166 1.166 0 0 0 .147 1.436c.204.21.48.332.77.342Zm0-1.425c.079 0 .154.032.21.088a.303.303 0 0 1 0 .424.294.294 0 0 1-.42 0 .308.308 0 0 1-.091-.212.305.305 0 0 1 .089-.214.293.293 0 0 1 .212-.086ZM16.785 9.98c.225 0 .445-.068.632-.194a1.15 1.15 0 0 0 .419-.518 1.17 1.17 0 0 0-.247-1.258 1.133 1.133 0 0 0-1.24-.25 1.141 1.141 0 0 0-.51.425 1.166 1.166 0 0 0 .141 1.457c.214.216.503.338.805.338Zm0-1.425a.292.292 0 0 1 .346.155.304.304 0 0 1-.087.373.294.294 0 0 1-.26.049.291.291 0 0 1-.345-.155.302.302 0 0 1 .21-.429.291.291 0 0 1 .136.007ZM5.665 27.59a.41.41 0 0 0-.218.247.422.422 0 0 0 .03.33.42.42 0 0 0 .364.225.383.383 0 0 0 .182-.04 12.27 12.27 0 0 1 5.614-1.385c2.067.03 4.104.496 5.984 1.368a.405.405 0 0 0 .465-.061.416.416 0 0 0 .104-.464.425.425 0 0 0-.216-.231 15.517 15.517 0 0 0-6.337-1.443c-2.076.002-4.122.5-5.972 1.454Z"
      />
    </svg>
  );
}
