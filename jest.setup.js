const React = require('react');
if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };
  global.window.scrollTo = () => {};
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      value: jest.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  }

  const mockResponse = jest.fn();
  Object.defineProperty(window, 'location', {
    value: {
      hash: {
        endsWith: mockResponse,
        includes: mockResponse,
      },
      assign: mockResponse,
    },
    writable: true,
  });
}

const Enzyme = require('enzyme');

const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

Object.assign(Enzyme.ReactWrapper.prototype, {
  findObserver() {
    return this.find('ResizeObserver');
  },
  triggerResize() {
    const ob = this.findObserver();
    ob.instance().onResize([{ target: ob.getDOMNode() }]);
  },
});

console.log('Current React Version:', React.version);
