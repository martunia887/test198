interface Profiler {
  start(name: string): void;
  end(name: string): void;
}

export function createProfiler(): Profiler {
  const profiles = new Map<string, [number, number]>();
  return {
    start(name) {
      profiles.set(name, process.hrtime());
    },
    end(name) {
      const start = profiles.get(name);
      if (!start) {
        return;
      }

      const [seconds, miliSeconds] = process.hrtime(start);

      // eslint-disable-next-line no-console
      console.info(
        `${name} execution time: %ds %dms`,
        seconds,
        miliSeconds / 1000000,
      );
    },
  };
}
