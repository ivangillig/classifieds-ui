import {
  UserOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { logoutRequest } from '../actions/authActions'

const useUserMenuItems = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()

  return [
    {
      key: 'my-listings',
      icon: <UnorderedListOutlined />,
      label: t('user.my_ads'),
      onClick: () => router.push('/user/private/my-listings'),
    },
    {
      key: 'my-profile',
      icon: <UserOutlined />,
      label: t('user.my_profile'),
      onClick: () => router.push('/user/private/my-profile/generalInfo'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('user.logout'),
      onClick: () => dispatch(logoutRequest()),
    },
  ]
}

export default useUserMenuItems
