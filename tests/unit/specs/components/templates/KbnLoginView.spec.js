import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import KbnLoginView from '@/components/templates/KbnLoginview.vue';
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('KbnLoginView', () => {
  let actions;
  let $router;
  let store;
  let LoginFormComponentStub;

  // 'KbnLoginForm' 컴포넌트의 로그인 버튼 클릭을 일으키는 헬퍼 함수
  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target);
    loginForm.vm.onlogin('foo@domain.com', '12345678');
  };

  beforeEach(() => {
    // KbnLoginForm 컴포넌트 스텁 설정
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    };
    // Vue Router 목업 설정
    $router = { push: jest.fn() };
    // login 액션 동작 확인을 위한 Vuex 관련 설정
    actions = { login: jest.fn() }; // login 액션 목업
    store = new Vuex.Store({ state: {}, actions });
  });

  /* describe('로그인', () => {
    let loginView;
    describe('성공', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: { 'kbn-login-form': KbnLoginForm },
          store,
          localVue
        });
      });

      test('보드 페이지 루트로 리다이렉트', done => {
        expect.assertions(2);

        triggerLogin(loginView, LoginFormComponentStub);
        expect($router.push).not.toHaveBeenCalled();

        loginView.vm.$nextTick(() => {
          // expect($router.push.args[0][0].path).toBe('/');
          expect($router.push).toHaveBeenCalled();
          done();
        });
      });
    });
  }); */
});
