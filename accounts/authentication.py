from django.contrib.auth import get_user_model
import requests

PERSONA_VERIFY_URL = 'https://verifier.login.persona.org/verify'
DOMAIN = 'localhost'

User = get_user_model()

class PersonaAuthenticationBackend(object):

    def authenticate(self, assertion):
        # Send the assertion to Mozilla's verifier service.
        data = {'assertion': assertion, 'audience': DOMAIN}
        # print('sending to mozilla', data)
        resp = requests.post(PERSONA_VERIFY_URL, data=data)
        # print('got', resp.content)

        # Did the verifier respond?
        if resp.ok:
            # Parse the response
            verification_data = resp.json()

            # Check if the assertion was valid
            if verification_data['status'] == 'okay':
                email = verification_data['email']
                try:
                    user = User.objects.get(email=email)
                except User.DoesNotExist:
                    user = User.objects.create(email=email)
                return user

    def get_user(self, email):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None
        return user

