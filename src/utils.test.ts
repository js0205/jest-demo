import { formatDate, debounce, deepClone, randomColor } from './utils';

// 测试 formatDate 函数
describe('formatDate 函数', () => {
  test('应该使用默认格式正确格式化日期', () => {
    const date = new Date(2023, 0, 15, 10, 30, 45); // 2023-01-15 10:30:45
    const formatted = formatDate(date);
    expect(formatted).toBe('2023-01-15 10:30:45');
  });

  test('应该使用自定义格式正确格式化日期', () => {
    const date = new Date(2023, 0, 15, 10, 30, 45);
    const formatted = formatDate(date, 'YYYY年MM月DD日 HH:mm');
    expect(formatted).toBe('2023年01月15日 10:30');
  });

  test('应该能处理时间戳输入', () => {
    const timestamp = new Date(2023, 0, 15, 10, 30, 45).getTime();
    const formatted = formatDate(timestamp);
    expect(formatted).toBe('2023-01-15 10:30:45');
  });
});

// 测试 debounce 函数
describe('debounce 函数', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('应该在指定延迟后只调用一次函数', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    // 多次调用
    debouncedFn();
    debouncedFn();
    debouncedFn();

    // 验证函数尚未被调用
    expect(mockFn).not.toBeCalled();

    // 快进时间
    jest.advanceTimersByTime(1000);

    // 验证函数只被调用一次
    expect(mockFn).toBeCalledTimes(1);
  });

  test('应该在新调用时重置定时器', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    
    // 快进 500ms
    jest.advanceTimersByTime(500);
    
    // 再次调用，重置定时器
    debouncedFn();
    
    // 再快进 500ms，此时第一次调用的定时器应该已经被清除
    jest.advanceTimersByTime(500);
    
    // 函数不应该被调用
    expect(mockFn).not.toBeCalled();
    
    // 再快进 500ms，第二次调用的定时器应该触发
    jest.advanceTimersByTime(500);
    
    // 验证函数被调用一次
    expect(mockFn).toBeCalledTimes(1);
  });
});

// 测试 deepClone 函数
describe('deepClone 函数', () => {
  test('应该正确克隆基本类型', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  test('应该正确克隆日期对象', () => {
    const date = new Date();
    const clonedDate = deepClone(date);
    
    expect(clonedDate).toBeInstanceOf(Date);
    expect(clonedDate.getTime()).toBe(date.getTime());
    expect(clonedDate).not.toBe(date); // 不应该是同一个引用
  });

  test('应该正确克隆数组', () => {
    const array = [1, 2, { name: '测试' }];
    const clonedArray = deepClone(array);
    
    expect(clonedArray).toEqual(array);
    expect(clonedArray).not.toBe(array); // 不应该是同一个引用
    expect(clonedArray[2]).not.toBe(array[2]); // 嵌套对象也应该被克隆
  });

  test('应该正确克隆嵌套对象', () => {
    const obj = {
      name: '测试',
      info: {
        age: 30,
        address: {
          city: '北京'
        }
      },
      hobbies: ['读书', '编程']
    };
    
    const clonedObj = deepClone(obj);
    
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj); // 不应该是同一个引用
    expect(clonedObj.info).not.toBe(obj.info); // 嵌套对象也应该被克隆
    expect(clonedObj.info.address).not.toBe(obj.info.address); // 深层嵌套对象也应该被克隆
    expect(clonedObj.hobbies).not.toBe(obj.hobbies); // 数组也应该被克隆
  });
});

// 测试 randomColor 函数
describe('randomColor 函数', () => {
  test('应该返回有效的十六进制颜色代码', () => {
    const color = randomColor();
    
    // 检查格式是否为 #RRGGBB
    expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  test('应该生成不同的颜色', () => {
    // 由于是随机函数，我们生成多个颜色并检查是否至少有一些不同
    // 注意：理论上有极小概率生成相同的颜色，但实际上几乎不可能
    const colors = new Set();
    for (let i = 0; i < 10; i++) {
      colors.add(randomColor());
    }
    
    // 如果生成了不同的颜色，Set 的大小应该大于 1
    expect(colors.size).toBeGreaterThan(1);
  });
});

describe('初始测试', () => {
  it('应该正常运行', () => {
    expect(true).toBe(true);
  });
}); 