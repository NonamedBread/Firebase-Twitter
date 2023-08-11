# Twitter Clone with React and Firebase

이 레포지토리는 React와 Firebase를 사용하여 트위터의 기본 기능을 클론한 프로젝트입니다. 이 프로젝트는 실시간 데이터베이스 기능, 인증, 스토리지 등 Firebase의 주요 기능을 활용하고 있습니다.

## 주요 기능

1. **사용자 인증**: Firebase Authentication을 사용하여 사용자 로그인 및 회원가입 기능을 구현하였습니다. 이메일/비밀번호를 이용한 인증 외에도 Google, Facebook 등의 소셜 로그인 기능을 지원합니다.

2. **트윗 작성 및 조회**: 사용자는 텍스트 또는 이미지를 포함한 트윗을 작성할 수 있습니다. Firebase Firestore를 사용하여 트윗 데이터를 실시간으로 저장하고 조회합니다.

3. **프로필 관리**: 사용자는 자신의 프로필 사진 및 닉네임을 변경할 수 있습니다. Firebase Storage를 사용하여 프로필 사진을 저장하고 관리합니다.

## 사용된 기술 스택

- **React**: 프론트엔드는 React를 사용하여 구현하였습니다. React는 컴포넌트 기반의 라이브러리로, 재사용 가능한 UI를 만드는 데 유용합니다.

- **Firebase**: 백엔드는 Firebase를 사용하여 구현하였습니다. Firebase는 구글이 제공하는 BaaS(Backend as a Service)로, 실시간 데이터베이스, 사용자 인증, 클라우드 스토리지 등 다양한 기능을 제공합니다.
