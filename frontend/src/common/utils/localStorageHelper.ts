/**
 * 로컬 스토리지 헬퍼 함수
 * @param key 저장할 항목의 키.
 * @param init 값이 없을 때 반환할 초기값.
 *
 * @returns 로컬 스토리지 조작을 위한 객체 (set, get, remove 메서드 포함).
 *
 * @description
 * - 로컬 스토리지에 데이터를 저장(set), 가져오기(get), 삭제(remove) 기능을 제공합니다.
 * - 값이 객체일 경우 자동으로 JSON 문자열로 변환해 저장합니다.
 * - 데이터가 존재하지 않으면 지정된 초기값(init)을 반환합니다.
 *
 * @example
 * ```ts
 * const storage = localStorageHelper("user", { name: "", age: 0 });
 *
 * storage.set({ name: "Alice", age: 25 }); // 데이터 저장
 * const user = storage.get(); // 데이터 가져오기
 * console.log(user); // { name: "Alice", age: 25 }
 *
 * storage.remove(); // 데이터 삭제
 * console.log(storage.get()); // 초기값 반환: { name: "", age: 0 }
 * ```
 */
export const localStorageHelper = <P>(key: string, init: P) => {
  const handler = {
    set(payload: P) {
      const value = JSON.stringify(payload);

      localStorage.setItem(key, value);

      return payload;
    },
    get(): P {
      const value = localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      }

      return init;
    },
    remove() {
      localStorage.removeItem(key);

      return undefined;
    },
  };

  return handler;
};
