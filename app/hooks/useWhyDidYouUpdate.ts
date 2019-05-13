import { useEffect, useRef } from 'react';

export default function useWhyDidYouUpdate(name: string, props: { [key: string]: any }) {
  const latestProps = useRef(props);

  useEffect(() => {
    const allKeys = Object.keys({ ...latestProps.current, ...props });
    const changes: { [key: string]: any } = {};
    for (const key of allKeys) {
      const [from, to] = [latestProps.current[key], props[key]];
      if (from !== to) {
        changes[key] = { from, to };
      }
    }

    if (Object.keys(changes).length > 0) {
      console.log(
        '%c [why-did-you-update]: ',
        'background-color: yellow; color: orange; font-weight: bold;'
      );
      console.log(
        `%c ${name}: `,
        'background-color: lightblue; color: blue; font-weight: bold;',
        changes
      );
    }

    latestProps.current = props;
  }, Object.values(props));
}
