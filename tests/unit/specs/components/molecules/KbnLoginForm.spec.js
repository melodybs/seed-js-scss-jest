import { shallowMount, mount } from '@vue/test-utils';
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue';

describe('KbnLoginForm', () => {
  describe('프로퍼티', () => {
    // 유효성 검사('valisation') 테스트
    describe('validation', () => {
      let loginForm;
      beforeEach(done => {
        loginForm = shallowMount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        });
        loginForm.vm.$nextTick(done);
      });

      // 이메일
      describe('email', () => {
        // 이메일 'required' 테스트
        describe('required', () => {
          describe('아무것도 입력하지 않음', () => {
            test('validation.email.required가 invalid임', () => {
              loginForm.setData({ email: '' });
              expect(loginForm.vm.validation.email.required).toEqual(false);
            });
          });
          describe('입력 내용 있음', () => {
            test('validation.email.required가 valid임', () => {
              loginForm.setData({ email: 'foo@domain.com' });
              expect(loginForm.vm.validation.email.required).toEqual(true);
            });
          });
          // 이메일 'format' 테스트
          describe('format', () => {
            describe('이메일 주소 형식이 아닌 값', () => {
              test('validation.email.format가 invalid임', () => {
                loginForm.setData({ email: 'foobar' });
                expect(loginForm.vm.validation.email.format).toEqual(false);
              });
            });
            describe('이메일 주소 형식인 값', () => {
              test('validation.email.format가 valid임', () => {
                loginForm.setData({ email: 'foo@domain.com' });
                expect(loginForm.vm.validation.email.format).toEqual(true);
              });
            });
          });
        });
      });

      // 패스워드
      describe('password', () => {
        // 패스워드 'required' 테스트
        describe('아무 것도 입력하지 않음', () => {
          test('validation.password.required가 invalid임', () => {
            loginForm.setData({ password: '' });
            expect(loginForm.vm.validation.password.required).toEqual(false);
          });
        });
        describe('입력 내용 있음', () => {
          test('validation.password.required가 valid임', () => {
            loginForm.setData({ password: 'xxxx' });
            expect(loginForm.vm.validation.password.required).toEqual(true);
          });
        });
      });
    });

    // 유효성('valid') 체크
    describe('valid', () => {
      let loginForm;
      beforeEach(done => {
        loginForm = shallowMount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        });
        loginForm.vm.$nextTick(done);
      });

      describe('모든 항목 유효성 검사 OK', () => {
        test('유효성 검사 결과 valid', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678'
          });
          expect(loginForm.vm.valid).toEqual(true);
        });
      });
      describe('유효성 검사 NG 항목 있음', () => {
        test('유효성 검사 결과 invalid', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: ''
          });
          expect(loginForm.vm.valid).toEqual(false);
        });
      });
    });

    // 로그인액션('disableLoginAction') 테스트
    describe('disableLoginAction', () => {
      let loginForm;
      beforeEach(done => {
        loginForm = shallowMount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        });
        loginForm.vm.$nextTick(done);
      });

      describe('유효성 검사 NG항목 있음', () => {
        test('유효하지 않은 로그인 처리', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: ''
          });
          expect(loginForm.vm.disableLoginAction).toEqual(true);
        });
      });
      describe('유효성 검사 모든 항목 OK이고 로그인 처리 중이 아님', () => {
        test('유효한 로그인 처리', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678'
          });
          expect(loginForm.vm.disableLoginAction).toEqual(false);
        });
      });
      describe('유효성 검사 모든 항목 OK이고 로그인 처리 중', () => {
        test('유효하지 않은 로그인 처리', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678',
            progress: true
          });
          expect(loginForm.vm.disableLoginAction).toEqual(true);
        });
      });
    });

    /* // 'onlogin' 이벤트 테스트
    describe('onlogin', () => {
      let loginForm;
      let onloginStub;
      beforeEach(done => {
        onloginStub = jest.fn();
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: onloginStub }
        });
        loginForm.setData({
          email: 'foo@domain.com',
          password: '12345678'
        });
        loginForm.vm.$nextTick(done);
      });

      // 'onlogin' 이벤트 'resolve'
      describe('resolve', () => {
        test('resolve 됨', done => {
          // expect.assertions(3);
          // onloginStub();

          // 클릭 이벤트
          loginForm.find('button').trigger('click');
          expect(onloginStub.mock.calls.length).toBe(0); // 아직 resolve되지 않음
          expect(loginForm.vm.error).toBe(''); // 오류 메시지 초기화
          expect(loginForm.vm.disableLoginAction).toEqual(true); // 로그인 액션 불가

          // 상태 반영
          loginForm.vm.$nextTick(() => {
            expect(onloginStub.mock.calls.length).toBe(1); // resolve 됨
            const authInfo = onloginStub.mock.calls[0][0];
            expect(authInfo.email).toEqual(loginForm.vm.email);
            expect(authInfo.password).toEqual(loginForm.vm.password);
            loginForm.vm.$nextTick(() => {
              // resolve 에서 상태 반영
              expect(loginForm.vm.error).toBe(''); // 오류 메시지는 초기화된 그대로
              expect(loginForm.vm.disableLoginAction).toEqual(false); // 로그인 액션 가능
              done();
            });
          });
        });
      });
    }); */
  });
});
