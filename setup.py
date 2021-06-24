from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in pawn/__init__.py
from pawn import __version__ as version

setup(
	name='pawn',
	version=version,
	description='Pawnshop Management',
	author='SERVIO Technologies',
	author_email='janguluan@servio.ph',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
