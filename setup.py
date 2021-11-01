import setuptools

setuptools.setup(
    name="streamlit-auth-component",
    version="0.0.1",
    author="Rahul Jain",
    author_email="",
    description="",
    long_description="",
    long_description_content_type="text/plain",
    url="",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 1.0",
        "python-jose == 3.3.0",
        "python-dotenv >= 0.19.0 "
    ],
)
