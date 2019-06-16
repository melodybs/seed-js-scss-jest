import { shallowMount } from '@vue/test-utils';
import KbnIcon from '@/components/atoms/KbnIcon.vue';

describe('KbnIcon', () => {
  describe('프로퍼티', () => {
    // name, 클래스 텍스트 테스트
    describe('name', () => {
      describe('close', () => {
        test('kbn-icon, close 클래스를 갖고, text가 "x"인 span 요소로 구성됨', () => {
          const icon = shallowMount(KbnIcon, { propsData: { name: 'close' } });
          expect(icon.is('span')).toEqual(true);
          expect(icon.classes()).toContain('kbn-icon', 'close');
          expect(icon.text()).toBe('x');
        });
      });

      describe('remove', () => {
        test('kbn-icon, remove 클래스를 갖고, text가 "x"인 span 요소로 구성됨', () => {
          const icon = shallowMount(KbnIcon, { propsData: { name: 'remove' } });
          expect(icon.is('span')).toEqual(true);
          expect(icon.classes()).toContain('kbn-icon', 'remove');
          expect(icon.text()).toBe('x');
        });
      });

      describe('add', () => {
        test('kbn-icon, add 클래스를 갖고, text가 "+"인 span 요소로 구성됨', () => {
          const icon = shallowMount(KbnIcon, { propsData: { name: 'add' } });
          expect(icon.is('span')).toEqual(true);
          expect(icon.classes()).toContain('kbn-icon', 'add');
          expect(icon.text()).toBe('+');
        });
      });
    });
  });
});
