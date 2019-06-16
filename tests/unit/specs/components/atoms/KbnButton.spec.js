import { shallowMount } from '@vue/test-utils';
import KbnButton from '@/components/atoms/KbnButton.vue';

describe('KbnButton', () => {
  describe('프로퍼티', () => {
    // 타입, 클래스 테스트
    describe('type', () => {
      describe('기본값', () => {
        test('kbn-button 클래스를 갖는 button 요소로 구성됨', () => {
          const button = shallowMount(KbnButton);
          expect(button.is('button')).toEqual(true);
          expect(button.classes()).toContain('kbn-button');
        });
      });
      describe('button', () => {
        test('kbn-button 클래스를 갖는 button 요소로 구성됨', () => {
          const button = shallowMount(KbnButton, {
            propsData: { type: 'button' }
          });
          expect(button.is('button')).toEqual(true);
          expect(button.classes()).toContain('kbn-button');
        });
      });
      describe('text', () => {
        test('kbn-button 클래스를 갖는 button 요소로 구성됨', () => {
          const button = shallowMount(KbnButton, {
            propsData: { type: 'text' }
          });
          expect(button.is('button')).toEqual(true);
          expect(button.classes()).toContain('kbn-button-text');
        });
      });
    });

    // disabled 속성 테스트
    describe('disabled', () => {
      describe('기본값', () => {
        test('disabled 속성이 부여되지 않음', () => {
          const button = shallowMount(KbnButton);
          expect(button.attributes().disabled).toBeUndefined();
        });
      });

      describe('true', () => {
        test('disabled 속성이 부여됨', () => {
          const button = shallowMount(KbnButton, {
            propsData: { disabled: true }
          });
          expect(button.attributes().disabled).toEqual('disabled');
        });
      });

      describe('false', () => {
        test('disabled 속성이 부여되지 않음', () => {
          const button = shallowMount(KbnButton);
          expect(button.attributes().disabled).toBeUndefined();
        });
      });
    });

    // 이벤트 테스트
    describe('이벤트', () => {
      describe('click', () => {
        test('일어나지 않음', () => {
          const button = shallowMount(KbnButton);
          button.trigger('click');
          expect(button.emitted().click.length).toBe(1);
        });
      });
    });

    // 슬롯 테스트
    describe('슬롯', () => {
      describe('콘텐츠 있음', () => {
        test('콘텐츠가 삽입됨', () => {
          const button = shallowMount(KbnButton, {
            slots: { default: '<p>hello</p>' }
          });
          expect(button.text()).toBe('hello');
        });
      });
      describe('콘텐츠 없음', () => {
        test('콘텐츠가 삽입되지 않음', () => {
          const button = shallowMount(KbnButton);
          expect(button.text()).toBe('');
        });
      });
    });
  });
});
