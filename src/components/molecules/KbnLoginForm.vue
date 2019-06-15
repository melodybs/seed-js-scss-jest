<template>
  <form novalidate>
    <div class="form-item">
      <label for="email">이메일</label>
      <input
        id="email"
        v-model="email"
        type="text"
        autocomplete="off"
        placeholder="예: kanban@domain.com"
        @focus="resetError"
      />
      <ul class="validation-errors">
        <li v-if="!validation.email.format">
          이메일 형식이 알맞지 않습니다.
        </li>
        <li v-if="!validation.email.required">
          이메일은 필수 입력 값 입니다.
        </li>
      </ul>
    </div>
    <div class="form-item">
      <label for="passowrd">비밀번호</label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="off"
        placeholder="예: xxxxxxxx"
        @focus="resetError"
      />
      <ul class="validation-errors">
        <li v-if="!validation.password.required">
          비밀번호는 필수 입력 값 입니다.
        </li>
      </ul>
    </div>
    <div class="form-actions">
      <KbnButton :disabled="disableLoginAction" @click="handleClick">
        로그인
      </KbnButton>
      <p v-if="progress" class="login-progress">
        로그인중...
      </p>
      <p v-if="error" class="login-error">
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton.vue';
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const required = val => !!val.trim();

export default {
  name: 'KbnLoginForm',

  components: {
    KbnButton
  },

  props: {
    onlogin: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      email: '',
      password: '',
      progress: false,
      error: ''
    };
  },

  computed: {
    validation() {
      return {
        email: {
          required: required(this.email),
          format: REGEX_EMAIL.test(this.email)
        },
        password: {
          required: required(this.password)
        }
      };
    },

    valid() {
      const validation = this.validation;
      const fields = Object.keys(validation);
      let valid = true;
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        valid = Object.keys(validation[field]).every(
          key => validation[field][key]
        );
        if (!valid) {
          break;
        }
      }
      return valid;
    },

    disableLoginAction() {
      return !this.valid || this.progress;
    }
  },

  methods: {
    resetError() {
      this.error = '';
    },

    // eslint-disable-next-line no-unused-vars
    handleClick(_ev) {
      if (this.disableLoginAction) {
        return;
      }

      this.progress = true;
      this.error = '';

      this.$nextTick(() => {
        this.onlogin({ email: this.email, password: this.password })
          .catch(err => {
            this.error = err.message;
          })
          .then(() => {
            this.progress = false;
          });
      });
    }
  }
};
</script>

<style scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}
label {
  display: block;
}
input {
  width: 100%;
  padding: 0.5em;
  font: inherit;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0.25em 0;
}
ul li {
  font-size: 0.5em;
}
.validation-errors {
  height: 32px;
}
.form-actions p {
  font-size: 0.5em;
}
</style>
